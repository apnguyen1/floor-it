import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { circularProgress, countdownBox, timerBox } from './Timer.style.tsx';
import { PlayerState } from '../../../../../types/global.type.ts';

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
  /** The player's state */
  playerState: PlayerState;
}

/**
 * Timer component that tracks and displays the remaining time for a player's turn.
 * Automatically resets when the game starts and calls `onTimeOut` when time expires.
 *
 * @param {TimerProps} props - Component props
 */

const Timer = ({ inGame, onTimeOut, isActive, playerState }: TimerProps) => {
  const initialTime = playerState.time * 1000;
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
          onTimeOut(playerState.name);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [inGame, isActive, onTimeOut, playerState.name]);

  /**
   * Formats the countdown time into a displayable string.
   *
   * @param {number} time - Time in milliseconds
   */

  return (
    <Box className={'timer-box'} sx={timerBox()}>
      <CircularProgress
        variant="determinate"
        value={percentRemaining}
        size={100}
        thickness={4}
        sx={circularProgress(playerState.color, isActive, remainingSeconds)}
      />
      <Typography
        sx={countdownBox(playerState.color, remainingSeconds)}
        variant="h2"
        position="absolute"
      >
        {remainingSeconds}
      </Typography>
    </Box>
  );
};

export default Timer;
