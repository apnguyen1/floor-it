import { Box } from '@mui/material';
import { Player } from '../../components/Player.tsx';
import QuestionDisplay from '../../components/QuestionDisplay.tsx';
import React from 'react';

export const GameScreen: React.FC = () => {
  return (
    <Box
      className="game-box"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: 2,
      }}
    >
      <Player playerName={'P1'} />
      <QuestionDisplay />
      <Player playerName={'P2'} />
    </Box>
  );
};
