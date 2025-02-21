import { Box, Typography } from '@mui/material';
import { memo } from 'react';

interface TriviaQuestionProps {
  type: string;
  question: string;
}

/**
 * Component cycling through questions and displaying them
 * @param category the chosen category
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
