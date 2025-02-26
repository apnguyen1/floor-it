import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { imageQuestion, textQuestion } from './TriviaQuestion.style.tsx';

/**
 * Props for the TriviaQuestion component
 */
interface TriviaQuestionProps {
  /** the type of question whether its an img or text */
  type: string;
  /** the question or image to display */
  question: string;
}

/**
 * Component cycling through questions and displaying them
 * @param {TriviaQuestionProps} props: Component prop
 */
const TriviaQuestion = memo(({ type, question }: TriviaQuestionProps) => {
  return (
    <>
      {type === 'text' ? (
        <>
          <Typography variant={'h3'} color="primary" sx={textQuestion()}>
            {question}
          </Typography>
        </>
      ) : (
        <Box
          className={'image-question'}
          component={'img'}
          src={question}
          alt={'trivia image'}
          sx={imageQuestion()}
        />
      )}
    </>
  );
});

export default TriviaQuestion;
