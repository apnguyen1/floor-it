import { Box, Typography } from '@mui/material';
import { memo } from 'react';

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
    <Box
      className={'question-box'}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <>
        {type === 'text' ? (
          <>
            <Typography variant={'h3'} color="primary">
              {question}
            </Typography>
          </>
        ) : (
          <img
            src={question}
            alt="trivia image"
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
          />
        )}
      </>
    </Box>
  );
});

export default TriviaQuestion;
