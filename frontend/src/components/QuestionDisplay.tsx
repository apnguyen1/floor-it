import { Box } from '@mui/material';
import React from 'react';

// TODO: Ticket-84
function TriviaQuestion() {
  return <h1>Nothing yet, TO BE DONE</h1>;
}

// TODO: TICKET-17
function Dictation() {
  return <h2>Ditation Machineeee</h2>;
}

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
      <TriviaQuestion></TriviaQuestion>
      <Dictation></Dictation>
    </Box>
  );
};

export default QuestionDisplay;
