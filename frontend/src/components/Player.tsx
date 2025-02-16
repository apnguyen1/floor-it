import { Avatar, Box } from '@mui/material';
import React from 'react';
import Timer from './Timer.tsx';

interface PlayerProps {
  playerName: string;
}

export const Player: React.FC<PlayerProps> = ({ playerName }: PlayerProps) => {
  const fullName: string[] = playerName.split(' ');
  const abbrev: string =
    fullName[0].length > 3 ? fullName[0].substring(0, 3) : fullName[0];

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}
    >
      <Avatar>{abbrev}</Avatar>
      <Timer />
      <h3>{fullName[0]}'s Turn</h3>
    </Box>
  );
};
