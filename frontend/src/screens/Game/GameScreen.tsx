import { useCallback, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Player } from './components/Player/Player.tsx';
import { Display } from './components/Display/Display.tsx';
import { useApp } from '../../hooks/useApp.ts';
import { ScreenType } from '../../constants/screens.ts';
import { useCategoryQuestions } from '../../hooks/useCategoryQuestions.ts';
import { useSpeechCommands } from '../../hooks/useSpeechCommands.ts';
import SpeechRecognition from 'react-speech-recognition';
import { GameStatus } from './GameScreen.type.ts';
import { gameBox } from './GameScreen.style.ts';
import WinningModal from './components/WinningModal/WinningModal.tsx';

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
export const GameScreen = () => {
  // manages the game state
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    inGame: false,
    activePlayer: true,
    winner: undefined,
  });
  const [showWinningModal, setShowWinningModal] = useState(false);
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

  /**
   * Handles the start of a trivia game
   *
   *  - sets the game status of `inGame` to true
   *  - hides the winning celebratory modal
   *  - begins transcription of the user's speech
   *  - pauses any ongoing audio.
   */
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
    setShowWinningModal(false);
  }, []);

  /**
   * Handles the end of a trivia game
   *
   *  - sets the game status of `inGame` to false and determines the winner
   *  - shows the winning celebratory modal
   *  - stops transcription of the user's speech
   *  - plays the winning celebratory music.
   */
  const handleTimeOut = useCallback(
    (playerName: string) => {
      setGameStatus((prev) => ({
        ...prev,
        inGame: false,
        winner: playerName === players.P1.name ? players.P2.name : players.P1.name,
      }));
      SpeechRecognition.abortListening().catch((e) => console.error(e));
      if (winRef.current) {
        winRef.current.currentTime = 0;
        winRef.current.play().catch((e) => console.error(e));
      }
      setShowWinningModal(true);
    },
    [players.P1.name, players.P2.name],
  );

  /**
   * Handles going back to the category screen
   *  - sets the game status of `inGame` to false.
   *  - stops transcription of the user's speech
   *  - pauses any ongoing audio.
   */
  const handleBackButton = useCallback(() => {
    setGameStatus((prev) => ({
      ...prev,
      inGame: false,
    }));
    setScreen(ScreenType.Categories);
    SpeechRecognition.abortListening().catch((e) => console.error(e));
    if (winRef.current) {
      winRef.current.pause();
    }
  }, [setScreen]);

  /**
   * Closes the winning modal without nagivating anywhere
   */
  const handleCloseWinningModal = useCallback(() => {
    setShowWinningModal(false);
  }, []);

  const winnerPlayer =
    gameStatus.winner === players.P1.name
      ? players.P1
      : gameStatus.winner === players.P2.name
        ? players.P2
        : undefined;

  return (
    <Box className="game-box" sx={gameBox(players)}>
      <Button variant="text" onClick={handleBackButton}>
        Back
      </Button>
      <Player
        playerName={players.P1.name}
        gameStatus={gameStatus}
        onTimeOut={handleTimeOut}
        isActive={gameStatus.activePlayer}
        listening={listening}
      />
      <Display
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
        gameStatus={gameStatus}
        onTimeOut={handleTimeOut}
        isActive={!gameStatus.activePlayer}
        listening={listening}
      />
      <WinningModal
        isOpen={showWinningModal}
        onClose={handleCloseWinningModal}
        winner={winnerPlayer}
      />
    </Box>
  );
};
