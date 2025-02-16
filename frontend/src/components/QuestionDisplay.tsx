import { Box } from '@mui/material';
import TriviaQuestion from './TriviaQuestion.tsx';
import Dictation from './Dictation.tsx';
import { Command } from '../types/command.interface.ts';

interface QuestionDisplayProps {
  commands: Command[];
}

const QuestionDisplay = ({ commands }: QuestionDisplayProps) => {
  return (
    <Box
      className="question-box"
      sx={{
        flex: 2,
        textAlign: 'center',
        padding: '16px',
        border: '15px solid black',
        borderRadius: '8px',
        minHeight: '100px',
      }}
    >
      <TriviaQuestion />
      <Dictation commands={commands} />
    </Box>
  );
};

export default QuestionDisplay;
