import { Avatar, Box, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Timer from './Timer/Timer.tsx';
import { playerAvatar, playerBox } from './Player.style.ts';
import { GameStatus } from '../../GameScreen.type.ts';
import { getAvatarInitials } from '../../../../utils/avatarLetter.ts';

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
}: PlayerProps) => {
  /**
   * Determines the player's current status to display (turn, winner, or waiting).
   */
  const getPlayerStatus = () => {
    if (gameStatus.winner) {
      return (
        <Typography
          variant="h6"
          color={gameStatus.winner === playerName ? 'success.main' : 'error.main'}
        >
          {gameStatus.winner === playerName ? 'Winner!' : "Time's up!"}
        </Typography>
      );
    }

    if (!gameStatus.inGame && isActive) {
      return (
        <Typography variant="h6" color="info">
          <strong>
            <u>You will start!</u>
          </strong>
        </Typography>
      );
    }

    if (isActive) {
      return (
        <>
          <Typography variant="h6" color={isActive ? 'primary' : 'textDisabled'}>
            {playerName}'s Turn
          </Typography>
          {listening ? (
            <MicIcon color={'success'} fontSize={'large'} />
          ) : (
            <MicOffIcon color={'error'} fontSize={'large'} />
          )}
        </>
      );
    }

    return null;
  };

  return (
    <Box className={'player-box'} sx={playerBox()}>
      <Avatar className={'player-avatar'} sx={playerAvatar(isActive)}>
        {getAvatarInitials(playerName, 'Player')}
      </Avatar>
      <Timer
        inGame={gameStatus.inGame}
        onTimeOut={onTimeOut}
        isActive={isActive}
        playerName={playerName}
      />
      {getPlayerStatus()}
    </Box>
  );
};
