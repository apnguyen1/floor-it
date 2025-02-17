import { Box } from '@mui/material';
import TriviaQuestion from './TriviaQuestion.tsx';
import Dictation from '../../components/Dictation.tsx';
import { Question } from '../../types/category.type.ts';

interface QuestionDisplayProps {
  questions: Question[] | undefined;
}

const QuestionDisplay = ({ questions }: QuestionDisplayProps) => {
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
      <TriviaQuestion questions={questions} />
      <Dictation />
    </Box>
  );
};

export default QuestionDisplay;
