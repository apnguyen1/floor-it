// TODO: Ticket-84
import { Question } from '../../types/category.type.ts';
import { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface TriviaQuestionProps {
  questions: Question[] | undefined;
}

const TriviaQuestion = ({ questions }: TriviaQuestionProps) => {
  const shuffledQuestions = shuffleArray(questions ? questions.slice(0) : []);
  const questionIndex = useRef(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    shuffledQuestions[questionIndex.current],
  );

  const nextQuestion = () => {
    if (!questions) return;

    setCurrentQuestion(() => {
      questionIndex.current = (questionIndex.current + 1) % shuffledQuestions.length;
      return questions[questionIndex.current];
    });
  };

  return (
    <Box>
      <Typography variant={'h3'} color="primary">
        {currentQuestion.question}
      </Typography>
      <Button variant={'contained'} onClick={nextQuestion}>
        Next Question
      </Button>
    </Box>
  );
};

const shuffleArray = (array: Question[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export default TriviaQuestion;
