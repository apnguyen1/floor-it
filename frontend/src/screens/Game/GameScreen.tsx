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
import { backButton, gameBox, gameContent } from './GameScreen.style.ts';
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
  //  Reference to the audio element for the winning sound effect.
  const winRef = useRef<HTMLAudioElement>(new Audio('/sounds/win.mp3'));

  // player's state, the selected categories, and function to switch screen
  const {
    players,
    selectedCategory,
    setScreen,
    setUseSharedTimer,
    updatePlayerOne,
    updatePlayerTwo,
    useSharedTimer,
  } = useApp();

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
    ) => {
      updatePlayerOne({ time: updatedPlayers.P1.time });
      updatePlayerTwo({ time: updatedPlayers.P2.time });
      setUseSharedTimer(updatedUseSharedTimer);
    },
    [players, setUseSharedTimer, updatePlayerOne, updatePlayerTwo],
  );

  /**
   * Closes the winning modal without navigating anywhere
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
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={handleBackButton}
        sx={backButton()}
      >
        Back
      </Button>

      <Button
        variant="contained"
        startIcon={<SettingsIcon />}
        onClick={handleOpenSettings}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          boxShadow: 2,
        }}
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
        />
        <Player
          playerState={players.P2}
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
        <SettingModal
          isOpen={showSettingModal}
          onClose={handleCloseSettingModal}
          players={players}
          useSharedTimer={useSharedTimer}
          onSave={handleSaveSettings}
        />
      </Box>
    </Box>
  );
};
