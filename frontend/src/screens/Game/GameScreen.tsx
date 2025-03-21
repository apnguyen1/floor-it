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
import { backButton, gameBox, gameContent, settingButton } from './GameScreen.style.ts';
import WinningModal from './components/WinningModal/WinningModal.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingModal } from '../../components/Settings/SettingModal.tsx';

/**
 * `GameScreen` manages the state and logic for the trivia game.
 * It handles player turns, category-based questions, and voice command processing.
 *
 * Features:
 *  - Manages in-game status, active player, and winner.
 *  - Uses voice commands for answering or skipping questions.
 *  - Plays a sound when a player wins.
 *  - Switches questions when an answer is correct or skipped.
 *  - Supports tournament mode to play through multiple categories.
 */
export const GameScreen = () => {
  // manages the game state
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    inGame: false,
    activePlayer: true,
    winner: undefined,
  });
  const [showWinningModal, setShowWinningModal] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  //  Reference to the audio element for the winning sound effect.
  const winRef = useRef<HTMLAudioElement>(new Audio('/sounds/win.mp3'));

  const {
    players,
    selectedCategory,
    setScreen,
    setUseSharedTimer,
    updatePlayerOne,
    updatePlayerTwo,
    useSharedTimer,
    setUseTextInput,
    useTextInput,
  } = useApp();

  // handles selection of categories
  const {
    category,
    currentQuestion,
    skipQuestion,
    setNextQuestion,
    fuzzyMatchingThreshold,
    isSkipped,
    goToNextCategory,
    getCategoryProgress,
  } = useCategoryQuestions(selectedCategory);

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
    fuzzyMatchingThreshold,
    isSkipped,
    isTyping,
  );

  if (hasError) {
    setUseTextInput(true);
  }

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
    if (!hasError) {
      SpeechRecognition.startListening({
        continuous: true,
      }).catch((e) => console.error('Speech Recognition failed: ', e));
    }
    if (winRef.current) {
      winRef.current.pause();
    }
    setShowWinningModal(false);
  }, [hasError]);

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
      if (!hasError) {
        SpeechRecognition.abortListening().catch((e) => console.error(e));
      }
      if (winRef.current) {
        winRef.current.currentTime = 0;
        winRef.current.play().catch((e) => console.error(e));
      }
      setShowWinningModal(true);
    },
    [players.P1.name, players.P2.name, hasError],
  );

  /**
   * Handles proceeding to the next category
   */
  const handlePlayNextCategory = useCallback(() => {
    if (goToNextCategory()) {
      setGameStatus({
        ...gameStatus,
        inGame: false,
        winner: undefined,
      });
    }
  }, [gameStatus, goToNextCategory]);

  /**
   * Handles replaying the current category
   */
  const handleReplayCategory = useCallback(() => {
    setGameStatus({
      ...gameStatus,
      inGame: false,
      winner: undefined,
    });
    setShowWinningModal(false);
  }, [gameStatus]);

  /**
   * Handles skipping the next category and going directly to the one after
   */
  const handleSkipCategory = useCallback(() => {
    if (goToNextCategory()) {
      setGameStatus({
        inGame: false,
        activePlayer: true,
        winner: undefined,
      });
      setShowWinningModal(false);
    } else {
      setScreen(ScreenType.Categories);
      setShowWinningModal(false);
    }
  }, [goToNextCategory, setScreen]);

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
    if (!hasError) {
      SpeechRecognition.abortListening().catch((e) => console.error(e));
    }
    if (winRef.current) {
      winRef.current.pause();
    }
  }, [setScreen, hasError]);

  /**
   * Opens the settings modal
   */
  const handleOpenSettings = useCallback(() => {
    setShowSettingModal(true);
  }, []);

  /**
   * Closes the settings modal
   */
  const handleCloseSettingModal = useCallback(() => {
    setShowSettingModal(false);
  }, []);

  /**
   * Saves the settings from the settings modal
   */
  const handleSaveSettings = useCallback(
    (
      updatedPlayers: {
        P1: typeof players.P1;
        P2: typeof players.P2;
      },
      updatedUseSharedTimer: boolean,
      updatedUseTextInput: boolean,
    ) => {
      updatePlayerOne({ time: updatedPlayers.P1.time });
      updatePlayerTwo({ time: updatedPlayers.P2.time });
      setUseSharedTimer(updatedUseSharedTimer);
      setUseTextInput(updatedUseTextInput);
    },
    [players, setUseSharedTimer, updatePlayerOne, updatePlayerTwo, setUseTextInput],
  );

  /**
   * Closes the winning modal without navigating anywhere
   */
  const handleCloseWinningModal = useCallback(() => {
    setShowWinningModal(false);
  }, []);

  const handleTextSubmit = () => {
    setNextQuestion();
    setGameStatus((prev) => ({
      ...prev,
      activePlayer: !prev.activePlayer,
    }));
  };

  const handleTextInputFocus = () => setIsTyping(true);
  const handleTextInputBlur = () => setIsTyping(false);

  const winnerPlayer =
    gameStatus.winner === players.P1.name
      ? players.P1
      : gameStatus.winner === players.P2.name
        ? players.P2
        : undefined;

  return (
    <Box className="game-box" sx={gameBox(players)}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={handleBackButton}
        sx={backButton()}
      >
        Back
      </Button>

      <Button
        disabled={gameStatus.inGame}
        variant="contained"
        startIcon={<SettingsIcon />}
        onClick={handleOpenSettings}
        sx={settingButton()}
      >
        Settings
      </Button>

      <Box className={'game-content'} sx={gameContent()}>
        <Player
          playerState={players.P1}
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
          isSkipped={isSkipped}
          useTextInput={useTextInput}
          onTextSubmit={handleTextSubmit}
          handleTextInputFocus={handleTextInputFocus}
          handleTextInputBlur={handleTextInputBlur}
          categoryProgress={getCategoryProgress()}
          onSkipCategory={handleSkipCategory}
        />
        <Player
          playerState={players.P2}
          gameStatus={gameStatus}
          onTimeOut={handleTimeOut}
          isActive={!gameStatus.activePlayer}
          listening={listening}
        />
      </Box>
      <WinningModal
        isOpen={showWinningModal}
        onClose={handleCloseWinningModal}
        winner={winnerPlayer}
        categoryProgress={getCategoryProgress()}
        onPlayNextCategory={handlePlayNextCategory}
        onReplayCategory={handleReplayCategory}
      />
      <SettingModal
        isOpen={showSettingModal}
        onClose={handleCloseSettingModal}
        players={players}
        useSharedTimer={useSharedTimer}
        useTextInput={useTextInput}
        onSave={handleSaveSettings}
        isSpeechError={hasError}
      />
    </Box>
  );
};
