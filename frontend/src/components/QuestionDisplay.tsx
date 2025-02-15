import { Box } from '@mui/material';
import React from 'react';
import TriviaQuestion from './TriviaQuestion.tsx';
import Dictation from './Dictation.tsx';

const QuestionDisplay: React.FC = () => {
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
      <Dictation />
    </Box>
  );
};

export default QuestionDisplay;
