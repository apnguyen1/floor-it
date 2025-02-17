import React, { useEffect, useRef, useState } from 'react';
import { Player } from '../../components/Player.tsx';
import QuestionDisplay from './QuestionDisplay.tsx';
import { Box, Button, Typography } from '@mui/material';
import { useApp } from '../../hooks/useApp.ts';
import { CategoryContent } from '../../types/category.type.ts';
import { GamePreview } from './GamePreview.tsx';

export const GameScreen: React.FC = () => {
  const { players, selectedCategory } = useApp();
  const [inGame, setInGame] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const category = useRef<CategoryContent | null>(null);

  useEffect(() => {
    if (!selectedCategory) {
      console.error('Selected category is undefined. Did you choose a category?');
      return;
    }
    category.current = selectedCategory;
  }, [selectedCategory]);

  const handleStartGame = () => {
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          setInGame(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!category.current)
    return <Typography variant={'h3'}>Loading category...</Typography>;

  return (
    <Box
      className="game-box"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: 2,
      }}
    >
      {!inGame ? (
        <>
          <GamePreview content={selectedCategory} />
          {/* Start Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleStartGame}
          >
            Start Game
          </Button>

          {/* Countdown Display */}
          {countdown !== null && (
            <Typography variant="h3" sx={{ mt: 2 }}>
              {countdown}
            </Typography>
          )}
        </>
      ) : (
        // Game Screen with Players and Questions
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <Player playerName={players.P1.name} />
          <QuestionDisplay questions={category.current.questions} />
          <Player playerName={'P2'} />
        </Box>
      )}
    </Box>
  );
};
