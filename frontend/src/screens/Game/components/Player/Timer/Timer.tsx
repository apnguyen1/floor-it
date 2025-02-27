import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { timerBox } from './Timer.style.tsx';

/**
 * Props for the Timer component.
 */
interface TimerProps {
  /** Whether the game is currently in progress */
  inGame: boolean;
  /** Callback function triggered when the player's timer runs out */
  onTimeOut: (playerName: string) => void;
  /** Whether the timer is active (indicates the player's turn) */
  isActive: boolean;
  /** Name of the player associated with the timer */
  playerName: string;
  // the players color
  playerColor: string;
  // the players time
  playerTime: number;
}

/**
 * Timer component that tracks and displays the remaining time for a player's turn.
 * Automatically resets when the game starts and calls `onTimeOut` when time expires.
 *
 * @param {TimerProps} props - Component props
 */

const Timer = ({
  inGame,
  onTimeOut,
  isActive,
  playerName,
  playerColor,
  playerTime,
}: TimerProps) => {
  const initialTime = playerTime * 1000;
  const [countdown, setCountDown] = useState(initialTime);
  const remainingSeconds = Math.floor(countdown / 1000);
  const percentRemaining = (countdown / initialTime) * 100;

  /**
   * Resets the countdown timer when the game starts.
   */
  useEffect(() => {
    if (inGame) {
      setCountDown(initialTime);
    }
  }, [inGame, initialTime]);

  /**
   * Starts the countdown when the game is in progress and the player is active.
   *  - Calls `onTimeOut` when the timer reaches zero.
   */
  useEffect(() => {
    if (!inGame || !isActive) {
      return;
    }

    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          onTimeOut(playerName);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [inGame, isActive, onTimeOut, playerName]);

  /**
   * Formats the countdown time into a displayable string.
   *
   * @param {number} time - Time in milliseconds
   */

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        my: 2,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={percentRemaining}
        size={100}
        thickness={4}
        sx={{
          color: remainingSeconds < 10 ? 'error.main' : playerColor,
          opacity: isActive ? 1 : 0.3,
          transition: 'all 0.3s ease',
        }}
      />
      <Typography
        sx={timerBox(playerColor, remainingSeconds)}
        variant="h2"
        position="absolute"
      >
        {remainingSeconds}
      </Typography>
    </Box>
  );
};

export default Timer;
