import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Player } from './Player.tsx';
import { QuestionDisplay } from './QuestionDisplay.tsx';
import { useApp } from '../../hooks/useApp.ts';
import { ScreenType } from '../../constants/screens.ts';
import { useCategoryQuestions } from '../../hooks/useCategoryQuestions.ts';
import { useSpeechCommands } from '../../hooks/useSpeechCommands.ts';

export const GameScreen: React.FC = () => {
  const { players, selectedCategory, setScreen } = useApp();
  const [gameStatus, setGameStatus] = useState({
    inGame: false,
    activePlayer: true,
    winner: undefined as string | undefined,
  });
  const { category, currentQuestion, skipQuestion, setNextQuestion } =
    useCategoryQuestions(selectedCategory);
  const { transcript, listening, hasError, errorMessage } = useSpeechCommands(
    currentQuestion?.answers || [],
    () => {
      setNextQuestion();
      setGameStatus((prev) => ({
        ...prev,
        activePlayer: !prev.activePlayer,
      }));
    },
    () => {
      skipQuestion();
    },
  );
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameStatus.inGame && currentQuestion) {
        e.preventDefault();
        skipQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus.inGame, currentQuestion, skipQuestion]);

  const handleStartGame = useCallback(() => {
    setGameStatus((prev) => ({
      ...prev,
      inGame: true,
      winner: undefined,
    }));
  }, []);

  const handleTimeOut = useCallback(
    (playerName: string) => {
      setGameStatus((prev) => ({
        ...prev,
        inGame: false,
        winner: playerName === players.P1.name ? players.P2.name : players.P1.name,
      }));
    },
    [players.P1.name, players.P2.name],
  );

  const handleBackButton = useCallback(() => {
    setGameStatus((prev) => ({
      ...prev,
      inGame: false,
    }));
    setScreen(ScreenType.Categories);
  }, [setScreen]);

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
        borderRadius: 150,
        backgroundColor: 'rgba(200,255,239,0.90)',
      }}
    >
      <Button variant="text" onClick={handleBackButton}>
        Back
      </Button>
      <Player
        playerName={players.P1.name}
        inGame={gameStatus.inGame}
        onTimeOut={handleTimeOut}
        isActive={gameStatus.activePlayer}
        winner={gameStatus.winner}
      />
      <QuestionDisplay
        category={category}
        currentQuestion={currentQuestion}
        inGame={gameStatus.inGame}
        onStartGame={handleStartGame}
        transcript={transcript}
        listening={listening}
        hasError={hasError}
        errorMessage={errorMessage}
      />
      <Player
        playerName={players.P2.name}
        inGame={gameStatus.inGame}
        onTimeOut={handleTimeOut}
        isActive={!gameStatus.activePlayer}
        winner={gameStatus.winner}
      />
    </Box>
  );
};
