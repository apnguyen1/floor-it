import { Box } from '@mui/material';
import TriviaQuestion from './TriviaQuestion.tsx';
import Dictation from './Dictation.tsx';
import { CategoryContent } from '../../types/category.type.ts';

interface QuestionDisplay {
  category: CategoryContent | undefined;
}

const QuestionDisplay = ({ category }: QuestionDisplay) => {
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
      <TriviaQuestion category={category} />
      <Dictation />
    </Box>
  );
};

export default QuestionDisplay;
