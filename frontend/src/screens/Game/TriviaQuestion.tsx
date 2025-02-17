import { CategoryContent, Question } from '../../types/category.type.ts';
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { shuffleArray } from '../../utils/shuffler.ts';

interface TriviaQuestionProps {
  category: CategoryContent | undefined;
}

/**
 * Component cycling through questions and displaying them
 * @param category the chosen category
 */
const TriviaQuestion = ({ category }: TriviaQuestionProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const questionIndex = useRef(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  //
  useEffect(() => {
    if (category) {
      const shuffledQuestions = shuffleArray(category.questions);
      setQuestions(shuffledQuestions);
      questionIndex.current = 0;
      if (shuffledQuestions.length > 0) {
        setCurrentQuestion(shuffledQuestions[0]);
      }
    }
  }, [category]);

  const nextQuestion = () => {
    if (questions.length === 0) return;

    questionIndex.current = (questionIndex.current + 1) % questions.length;
    setCurrentQuestion(questions[questionIndex.current]);
  };

  if (!currentQuestion || !category)
    return (
      <Typography variant={'h3'} color={'info'}>
        Loading...
      </Typography>
    );

  return (
    <Box>
      <>
        {category.type === 'text' ? (
          <>
            <Typography variant={'h3'} color="primary">
              {currentQuestion.question}
            </Typography>
          </>
        ) : (
          <>
            <img src={currentQuestion.question} alt={'trivia image'} />
          </>
        )}
        {/*TODO TO BE removed during integration*/}
        <Button variant="contained" onClick={nextQuestion}>
          Next Question
        </Button>
      </>
    </Box>
  );
};

export default TriviaQuestion;
