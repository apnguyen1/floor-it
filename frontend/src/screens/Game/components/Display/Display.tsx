import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import TriviaQuestion from './GameDisplay/TriviaQuestion.tsx';
import { ReadyToPlay } from './GamePreview/ReadyToPlay.tsx';
import { CategoryContent, Question } from '../../GameScreen.type.ts';
import { questionBox } from './DIsplay.style.ts';

interface DisplayProps {
  category: CategoryContent | undefined;
  currentQuestion: Question | undefined;
  inGame: boolean;
  onStartGame: () => void;
  transcript: string;
  hasError: boolean;
  errorMessage?: string;
}

export const Display = ({
  category,
  currentQuestion,
  inGame,
  onStartGame,
  transcript,
  hasError,
  errorMessage,
}: DisplayProps) => {
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
    <Box className="question-box" sx={questionBox()}>
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
