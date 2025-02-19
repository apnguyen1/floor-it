// QuestionDisplay.tsx
import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import TriviaQuestion from './TriviaQuestion.tsx';
import { CategoryContent, Question } from '../../types/category.type.ts';
import { ReadyToPlay } from './ReadyToPlay.tsx';

interface QuestionDisplayProps {
  category: CategoryContent | undefined;
  currentQuestion: Question | undefined;
  inGame: boolean;
  onStartGame: () => void;
  transcript: string;
  hasError: boolean;
  errorMessage?: string;
}

export const QuestionDisplay = ({
  category,
  currentQuestion,
  inGame,
  onStartGame,
  transcript,
  hasError,
  errorMessage,
}: QuestionDisplayProps) => {
  if (!category || !currentQuestion)
    return <Typography variant="h3">Loading...</Typography>;

  if (hasError) {
    return (
      <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>
    );
  }

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
      {!inGame ? (
        <ReadyToPlay category={category} onStartGame={onStartGame} />
      ) : (
        <>
          <TriviaQuestion type={category.type} question={currentQuestion.question} />
          <Box>
            <Typography variant={'subtitle2'} color={'textSecondary'}>
              transcript: {transcript}
            </Typography>
          </Box>
          <Typography variant={'caption'}>
            Press <b>Space</b> or say <b>Next</b> to skip question
          </Typography>
        </>
      )}
    </Box>
  );
};
