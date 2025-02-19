import { Avatar, Box, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import Timer from './Timer.tsx';

interface PlayerProps {
  playerName: string;
  inGame: boolean;
  onTimeOut: (playerName: string) => void;
  isActive: boolean;
}

export const Player: React.FC<PlayerProps> = ({
  playerName,
  inGame,
  onTimeOut,
  isActive,
}: PlayerProps) => {
  const firstName: string = playerName.split(' ')[0];
  const abbrev: string = firstName.length > 3 ? firstName.substring(0, 3) : firstName;

  const handleTimeOut = useCallback(() => {
    console.log(`${playerName} lost!`);
    onTimeOut(playerName);
  }, [onTimeOut, playerName]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
        minHeight: '495px',
        padding: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '10px',
      }}
    >
      <Avatar>{abbrev}</Avatar>
      <Timer inGame={inGame} onTimeOut={handleTimeOut} isActive={isActive} />
      <Typography variant="h6" color={isActive ? 'primary' : 'textDisabled'}>
        {firstName}'s Turn
      </Typography>
    </Box>
  );
};
