import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Alert, AlertTitle } from '@mui/material';
import { Command } from './command.interface.ts';

interface DictationProps {
  commands: Command[];
  inGame: boolean;
}

const Dictation = ({ commands, inGame }: DictationProps) => {
  const { browserSupportsSpeechRecognition, isMicrophoneAvailable, interimTranscript } =
    useSpeechRecognition({ commands });

  if (!isMicrophoneAvailable) {
    return (
      <Alert variant={'filled'} severity={'error'}>
        <AlertTitle>Error</AlertTitle>
        Device doesn't have microphone!
      </Alert>
    );
  }

  if (!browserSupportsSpeechRecognition) {
    return (
      <Alert variant={'filled'}>
        <AlertTitle>Error</AlertTitle>
        Browser doesn't support Speech Recognition!
      </Alert>
    );
  }

  if (inGame) {
    SpeechRecognition.startListening({ continuous: true, interimResults: true });
  } else {
    SpeechRecognition.stopListening();
  }

  return interimTranscript;
};

export default Dictation;
