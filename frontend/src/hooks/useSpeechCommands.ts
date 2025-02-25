import { useEffect, useMemo } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import { GameStatus } from '../screens/Game/GameScreen.type.ts';

/** https://www.npmjs.com/package/react-speech-recognition#commands */
export type Command = {
  command: string | string[] | RegExp;
  callback: (...args: string[]) => void;
  isFuzzyMatch?: boolean;
  matchInterim?: boolean;
  fuzzyMatchingThreshold?: number;
  bestMatchOnly?: boolean;
};

/**
 * Creates commands for every new question.
 *
 * @param overrides overrides the default command types.
 */
export const createCommand = (overrides: Partial<Command> = {}): Command => ({
  command: '',
  callback: () => {},
  isFuzzyMatch: true,
  matchInterim: true,
  fuzzyMatchingThreshold: 0.2,
  bestMatchOnly: true,
  ...overrides,
});

/**
 * Custom hook to manage speech recognition commands for the game.
 *
 * This hook:
 * - Detects spoken commands to answer or skip questions.
 * - Listens for keyboard shortcuts (Spacebar) to skip.
 * - Resets the transcript when correct answers change.
 *
 * @param {GameStatus} gameStatus - Current game status (inGame, activePlayer, winner).
 * @param {string[]} correctAnswers - List of correct answer phrases.
 * @param {() => void} onCorrectAnswer - Callback when a correct answer is spoken.
 * @param {() => void} onSkip - Callback when the user wants to skip.
 */
export const useSpeechCommands = (
  gameStatus: GameStatus,
  correctAnswers: string[],
  onCorrectAnswer: () => void,
  onSkip: () => void,
) => {
  const commands = useMemo(
    () => [
      createCommand({ command: correctAnswers, callback: onCorrectAnswer }),
      createCommand({
        command: ['Next', 'Pass'], // handles skipping by voice command Next / Pass
        fuzzyMatchingThreshold: 0.9,
        callback: onSkip,
      }),
    ],
    [correctAnswers, onCorrectAnswer, onSkip],
  );

  // handles skipping by space
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameStatus.inGame) {
        e.preventDefault();
        onSkip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus.inGame, onSkip]);

  // Initializes speech recognition
  const {
    transcript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    listening,
    resetTranscript,
  } = useSpeechRecognition({ commands });

  // When we're displayed a new question, the transcript is reset
  useEffect(() => {
    resetTranscript();
  }, [correctAnswers, resetTranscript]);

  // Error handling messages
  const errorMessage = !browserSupportsSpeechRecognition
    ? "Browser doesn't support Speech Recognition!"
    : !isMicrophoneAvailable
      ? "Device doesn't have a microphone!"
      : undefined;

  return {
    transcript,
    listening,
    hasError: !!errorMessage,
    errorMessage,
  };
};
