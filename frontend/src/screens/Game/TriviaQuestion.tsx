import { Box, Typography } from '@mui/material';

interface TriviaQuestionProps {
  type: string;
  question: string;
}

/**
 * Component cycling through questions and displaying them
 * @param category the chosen category
 */
const TriviaQuestion = ({ type, question }: TriviaQuestionProps) => {
  console.log(question);

  return (
    <Box>
      <>
        {type === 'text' ? (
          <>
            <Typography variant={'h3'} color="primary">
              {question}
            </Typography>
          </>
        ) : (
          <>
            <img src={question} alt={'trivia image'} />
          </>
        )}
      </>
    </Box>
  );
};

export default TriviaQuestion;
