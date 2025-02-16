import React from 'react';
import { Player } from '../../components/Player.tsx';
import QuestionDisplay from '../../components/QuestionDisplay.tsx';
import { Box } from '@mui/material';
import { useApp } from '../../hooks/useApp.ts';

export const GameScreen: React.FC = () => {
  const { players } = useApp();

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
      <Player playerName={players.P1.name} />
      <QuestionDisplay />
      <Player playerName={players.P2.name} />
    </Box>
  );
};
