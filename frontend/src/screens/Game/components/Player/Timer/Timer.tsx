import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

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
}

/**
 * Timer component that tracks and displays the remaining time for a player's turn.
 * Automatically resets when the game starts and calls `onTimeOut` when time expires.
 *
 * @param {TimerProps} props - Component props
 */

const Timer = ({ inGame, onTimeOut, isActive, playerName }: TimerProps) => {
  const initialTime = 30 * 1000; // 30 seconds
  const [countdown, setCountDown] = useState(initialTime);

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
  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    return `${seconds}s`;
  };

  return <Typography variant={'h2'}>{formatTime(countdown)}</Typography>;
};

export default Timer;
