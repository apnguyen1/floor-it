import React, { useEffect, useState } from 'react';

interface TimerProps {
  gameStarted: boolean;
}

const Timer: React.FC = ({ gameStarted }: TimerProps) => {
  const initialTime = 45 * 1000;
  const [time, setTime] = useState(initialTime);

  useEffect(() => {}, []);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return <h2>{formatTime(45000)}</h2>;
};

export default Timer;
