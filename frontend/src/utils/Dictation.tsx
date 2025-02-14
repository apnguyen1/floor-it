import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Alert, AlertTitle } from '@mui/material';
import { Command } from './command.interface.ts';

interface DictationProps {
  commands: Command[];
}

const Dictation = ({ commands }: DictationProps) => {
  const {
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    interimTranscript,
    listening,
  } = useSpeechRecognition({ commands });

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
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <p>{interimTranscript}</p>
    </div>
  );
};

export default Dictation;
