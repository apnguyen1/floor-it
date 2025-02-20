import React, { useCallback, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Player } from './components/Player/Player.tsx';
import { QuestionDisplay } from './components/Display/QuestionDisplay.tsx';
import { useApp } from '../../hooks/useApp.ts';
import { ScreenType } from '../../constants/screens.ts';
import { useCategoryQuestions } from '../../hooks/useCategoryQuestions.ts';
import { useSpeechCommands } from '../../hooks/useSpeechCommands.ts';
import SpeechRecognition from 'react-speech-recognition';
import { GameStatus } from './GameScreen.type.ts';
import { gameBox } from './GameScreen.style.ts';

/**
 * `GameScreen` manages the state and logic for the trivia game.
 * It handles player turns, category-based questions, and voice command processing.
 *
 * Features:
 *  - Manages in-game status, active player, and winner.
 *  - Uses voice commands for answering or skipping questions.
 *  - Plays a sound when a player wins.
 *  - Switches questions when an answer is correct or skipped.
 */
export const GameScreen: React.FC = () => {
  // manages the game state
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    inGame: false,
    activePlayer: true,
    winner: undefined,
  });
  //  Reference to the audio element for the winning sound effect.
  const winRef = useRef<HTMLAudioElement>(new Audio('/sounds/win.mp3'));

  // player's state, the selected categories, and function to switch screen
  const { players, selectedCategory, setScreen } = useApp();

  // handles selection of categories
  const { category, currentQuestion, skipQuestion, setNextQuestion } =
    useCategoryQuestions(selectedCategory);

  // handles speech dictation and logic
  const { transcript, listening, hasError, errorMessage } = useSpeechCommands(
    gameStatus,
    currentQuestion?.answers || [],
    () => {
      setNextQuestion();
      setGameStatus((prev) => ({
        ...prev,
        activePlayer: !prev.activePlayer,
      }));
    },
    skipQuestion,
  );

  const handleStartGame = useCallback(() => {
    setGameStatus((prev) => ({
      ...prev,
      inGame: true,
      winner: undefined,
    }));
    SpeechRecognition.startListening({
      continuous: true,
    }).catch((e) => console.error('Speech Recognition failed: ', e));
    if (winRef.current) {
      winRef.current.pause();
    }
  }, []);

  const handleTimeOut = useCallback(
    (playerName: string) => {
      setGameStatus((prev) => ({
        ...prev,
        inGame: false,
        winner: playerName === players.P1.name ? players.P2.name : players.P1.name,
      }));
      SpeechRecognition.stopListening().catch((e) => console.error(e));
      if (winRef.current) {
        winRef.current.currentTime = 0;
        winRef.current.play().catch((e) => console.error(e));
      }
    },
    [players.P1.name, players.P2.name],
  );

  const handleBackButton = useCallback(() => {
    setGameStatus((prev) => ({
      ...prev,
      inGame: false,
    }));
    setScreen(ScreenType.Categories);
    SpeechRecognition.stopListening().catch((e) => console.error(e));
    if (winRef.current) {
      winRef.current.pause();
    }
  }, [setScreen]);

  return (
    <Box className="game-box" sx={gameBox(players)}>
      <Button variant="text" onClick={handleBackButton}>
        Back
      </Button>
      <Player
        playerName={players.P1.name}
        inGame={gameStatus.inGame}
        onTimeOut={handleTimeOut}
        isActive={gameStatus.activePlayer}
        winner={gameStatus.winner}
        listening={listening}
      />
      <QuestionDisplay
        category={category}
        currentQuestion={currentQuestion}
        inGame={gameStatus.inGame}
        onStartGame={handleStartGame}
        transcript={transcript}
        hasError={hasError}
        errorMessage={errorMessage}
      />
      <Player
        playerName={players.P2.name}
        inGame={gameStatus.inGame}
        onTimeOut={handleTimeOut}
        isActive={!gameStatus.activePlayer}
        winner={gameStatus.winner}
        listening={listening}
      />
    </Box>
  );
};
