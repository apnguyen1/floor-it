import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Alert, AlertTitle } from '@mui/material';
import { Command } from '../types/command.ts';

interface DictationProps {
  commands: Command[];
}

const Dictation = ({ commands }: DictationProps) => {
  const {
    transcript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    listening,
    resetTranscript,
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

  const handleStartSpeech = () =>
    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
    });

  const handleStopSpeech = () => {
    SpeechRecognition.stopListening().then(() => resetTranscript());
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={handleStartSpeech}>Start</button>
      <button onClick={handleStopSpeech}>Stop</button>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictation;
