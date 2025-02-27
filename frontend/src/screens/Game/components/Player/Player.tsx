import { Avatar, Box, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Timer from './Timer/Timer.tsx';
import {
  activeTurn,
  micIcon,
  playerAvatar,
  playerBox,
  playerStatus,
} from './Player.style.ts';
import { GameStatus } from '../../GameScreen.type.ts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { getAvatarInitials } from '../../../../utils/avatarInitials.ts';

/**
 * Props for the Player component.
 */
interface PlayerProps {
  /** Name of the player */
  playerName: string;
  /** the game status */
  gameStatus: GameStatus;
  /** Callback function triggered when the player's timer runs out */
  onTimeOut: (playerName: string) => void;
  /** Whether it's the player's turn */
  isActive: boolean;
  /** Indicates if the player is currently speaking (mic on/off) */
  listening: boolean;
  // the player's color
  playerColor: string;
  // the player's time
  playerTime: number;
}

/**
 * Player component displays a player's avatar, name, timer, and status during the game.
 * It also shows the mic status and game-related messages.
 *
 * @param {PlayerProps} props - Component props
 */
export const Player = ({
  playerName,
  gameStatus,
  onTimeOut,
  isActive,
  listening,
  playerColor,
  playerTime,
}: PlayerProps) => {
  const firstName: string = playerName.split(' ')[0];
  /**
   * Determines the player's current status to display (turn, winner, or waiting).
   */
  const getPlayerStatus = () => {
    if (gameStatus.winner) {
      return (
        <Box sx={playerStatus(gameStatus.winner === playerName)}>
          {gameStatus.winner === playerName ? (
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
          <Typography variant="h6" color={isActive ? 'primary.main' : 'grey.500'}>
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
    <Box className={'player-box'} sx={playerBox(playerColor, isActive)}>
      <Avatar className={'player-avatar'} sx={playerAvatar(playerColor)}>
        {getAvatarInitials(playerName, 'Player')}
      </Avatar>
      <Timer
        inGame={gameStatus.inGame}
        onTimeOut={onTimeOut}
        isActive={isActive}
        playerName={playerName}
        playerColor={playerColor}
        playerTime={playerTime}
      />
      {getPlayerStatus()}
    </Box>
  );
};
