import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Timer from './Timer/Timer.tsx';
import {
  activePlayerIndicator,
  activeTurn,
  micIcon,
  playerAvatar,
  playerBox,
  playerName,
  playerStatus,
  turnArrow,
} from './Player.style.ts';
import { GameStatus } from '../../GameScreen.type.ts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { getAvatarInitials } from '../../../../utils/avatarInitials.ts';
import { PlayerState } from '../../../../types/global.type.ts';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

/**
 * Props for the Player component.
 */
export interface PlayerProps {
  /** the game status */
  gameStatus: GameStatus;
  /** Whether it's the player's turn */
  isActive: boolean;
  /** Indicates if the player is currently speaking (mic on/off) */
  listening: boolean;
  /** Callback function triggered when the player's timer runs out */
  onTimeOut: (playerName: string) => void;
  /** Name of the player */
  playerState: PlayerState;
}

/**
 * Player component displays a player's avatar, name, timer, and status during the game.
 * It also shows the mic status and game-related messages.
 *
 * @param {PlayerProps} props - Component props
 */
export const Player = ({
  playerState,
  gameStatus,
  onTimeOut,
  isActive,
  listening,
}: PlayerProps) => {
  const firstName: string = playerState.name.split(' ')[0];

  /**
   * Determines the player's current status to display (turn, winner, or waiting).
   */
  const getPlayerStatus = () => {
    if (gameStatus.winner) {
      return (
        <Box sx={playerStatus(gameStatus.winner === playerState.name)}>
          {gameStatus.winner === playerState.name ? (
            <>
              <EmojiEventsIcon color="success" />
              <Typography variant="h6" color="success.main">
                Winner!
              </Typography>
            </>
          ) : (
            <>
              <TimerOffIcon color="error" />
              <Typography variant="h6" color="error.main">
                Time's up!
              </Typography>
            </>
          )}
        </Box>
      );
    }

    if (!gameStatus.inGame && isActive) {
      return (
        <Box sx={playerStatus(true)}>
          <HourglassTopIcon />
          <Typography variant="h6" color="info.main">
            You will start!
          </Typography>
        </Box>
      );
    }

    if (isActive) {
      return (
        <Box sx={activeTurn()}>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            {firstName}'s Turn
          </Typography>
          {listening ? (
            <MicIcon sx={micIcon(listening)} />
          ) : (
            <MicOffIcon sx={micIcon(listening)} />
          )}
        </Box>
      );
    }

    return null;
  };

  return (
    <Box
      className={'player-box'}
      sx={playerBox(playerState.color, isActive, gameStatus.inGame)}
    >
      {gameStatus.inGame && isActive && (
        <Box sx={turnArrow(isActive)}>
          <ArrowRightAltIcon
            fontSize="large"
            sx={{
              color: playerState.color,
              transform: isActive ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          />
        </Box>
      )}

      <Box sx={activePlayerIndicator(isActive, gameStatus.inGame, playerState.color)}>
        <Tooltip title={isActive ? 'Current Turn' : ''} placement="top" arrow>
          <Avatar
            className={'player-avatar'}
            sx={playerAvatar(playerState.color, isActive, gameStatus.inGame)}
          >
            {getAvatarInitials(playerState.name, 'Player')}
          </Avatar>
        </Tooltip>

        <Typography variant="h6" sx={playerName(isActive, gameStatus.inGame)}>
          {playerState.name}
        </Typography>
      </Box>

      <Timer
        inGame={gameStatus.inGame}
        onTimeOut={onTimeOut}
        isActive={isActive}
        playerState={playerState}
      />

      {getPlayerStatus()}
    </Box>
  );
};
