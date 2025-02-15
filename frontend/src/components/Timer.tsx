import React from 'react';

// TODO: To be implemented ticket-15
const Timer: React.FC = () => {
  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return <h2>{formatTime(450000)}</h2>;
};

export default Timer;
