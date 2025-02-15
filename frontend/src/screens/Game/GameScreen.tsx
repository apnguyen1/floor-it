import { Box } from '@mui/material';
import { Player } from '../../components/Player.tsx';
import { useGame } from '../../hooks/useGame.ts';
import QuestionDisplay from '../../components/QuestionDisplay.tsx';
import React from 'react';
import { TriviaInterface } from '../../types/trivia.interface.ts';

interface GameProps {
  categoryData: TriviaInterface;
}

export const GameScreen: React.FC<GameProps> = ({ categoryData }: GameProps) => {
  const { players } = useGame();
  const initialTime = 45 * 1000; // 45 ms * 1000 = 45 seconds

  console.log(categoryData);

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
      <Player playerName={players.P1} initialTime={initialTime} />
      <QuestionDisplay />
      <Player playerName={players.P2} initialTime={initialTime} />
    </Box>
  );
};
