import { useEffect, useMemo } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import { createCommand } from '../constants/config.ts';

export const useSpeechCommands = (
  correctAnswers: string[],
  onCorrectAnswer: () => void,
  onSkip: () => void,
) => {
  const commands = useMemo(
    () => [
      createCommand({ command: correctAnswers, callback: onCorrectAnswer }),
      createCommand({
        command: ['Next', 'Pass'],
        callback: onSkip,
      }),
    ],
    [correctAnswers, onCorrectAnswer, onSkip],
  );

  const {
    transcript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    listening,
    resetTranscript,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    resetTranscript();
  }, [correctAnswers, resetTranscript]);

  return {
    transcript,
    listening,
    hasError: !browserSupportsSpeechRecognition || !isMicrophoneAvailable,
    errorMessage: !browserSupportsSpeechRecognition
      ? "Browser doesn't support Speech Recognition!"
      : !isMicrophoneAvailable
        ? "Device doesn't have a microphone!"
        : undefined,
  };
};
