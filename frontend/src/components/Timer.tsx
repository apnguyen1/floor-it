import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

interface TimerProps {
  inGame: boolean;
  onTimeOut: () => void;
  isActive: boolean;
}

const Timer = ({ inGame, onTimeOut, isActive }: TimerProps) => {
  const initialTime = 10 * 1000;
  const [countdown, setCountDown] = useState(initialTime);

  useEffect(() => {
    if (!inGame || !isActive) {
      return;
    }

    if (countdown <= 0) {
      onTimeOut();
      return;
    }

    const interval = setInterval(() => {
      setCountDown((prev) => {
        return Math.max(prev - 10, 0);
      });
    }, 10);

    return () => clearInterval(interval);
  }, [countdown, inGame, isActive, onTimeOut]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return <Typography variant={'h2'}>{formatTime(countdown)}</Typography>;
};

export default Timer;
