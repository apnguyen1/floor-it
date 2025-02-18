import { useSpeechRecognition } from 'react-speech-recognition';
import { Alert, AlertTitle } from '@mui/material';
import { Command } from '../../types/command.ts';
import { useEffect } from 'react';
import { Question } from '../../types/category.type.ts';

interface DictationProps {
  commands: Command[];
  question: Question;
}

const Dictation = ({ commands, question }: DictationProps) => {
  const {
    transcript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    listening,
    resetTranscript,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    resetTranscript();
  }, [question, resetTranscript]);

  if (!isMicrophoneAvailable) {
    return (
      <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        Device doesn't have a microphone!
      </Alert>
    );
  }

  if (!browserSupportsSpeechRecognition) {
    return (
      <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        Browser doesn't support Speech Recognition!
      </Alert>
    );
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictation;
