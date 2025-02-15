import { Avatar, Box } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';

interface PlayerProps {
  playerName: string;
  time: number;
}

interface TimerProps {
  initialTime: number;
}

// TOOO:
const Timer: React.FC<PlayerProps> = ({ initialTime }: TimerProps) => {
  return <h2>{initialTime}</h2>;
};

export const Player = ({ playerName, time }: PlayerProps) => {
  const fullName: string[] = playerName.split(' ');
  const abbrev: string = fullName.map((s) => s.charAt(0).toUpperCase()).join('');

  return (
    <Box
      className="player-frame-box"
      sx={{
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75%',
        width: '100%',
      }}
    >
      <Box
        className="player-content-box"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '50%',
          alignItems: 'center',

          justifyContent: 'space-around',
          gap: 1,
        }}
      >
        <Box className="player-avatar-box">
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 64,
              height: 64,
              fontSize: 24,
            }}
          >
            {abbrev}
          </Avatar>
        </Box>
        <Timer time={time} />
        <Box className="player-turn-box" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
          {fullName[0]}'s turn
        </Box>
      </Box>
    </Box>
  );
};
