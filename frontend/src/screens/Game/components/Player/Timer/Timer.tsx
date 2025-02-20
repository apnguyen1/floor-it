import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

interface TimerProps {
  inGame: boolean;
  onTimeOut: (playerName: string) => void;
  isActive: boolean;
  playerName: string;
}

const Timer = ({ inGame, onTimeOut, isActive, playerName }: TimerProps) => {
  const initialTime = 30 * 1000; // 30 seconds
  const [countdown, setCountDown] = useState(initialTime);

  useEffect(() => {
    if (inGame) {
      setCountDown(initialTime);
    }
  }, [inGame, initialTime]);

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

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    return `${seconds}s`;
  };

  return <Typography variant={'h2'}>{formatTime(countdown)}</Typography>;
};

export default Timer;
