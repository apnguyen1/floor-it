import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import TriviaQuestion from './GameDisplay/TriviaQuestion.tsx';
import { GamePreview } from './GamePreview/GamePreview.tsx';
import { CategoryContent, Question } from '../../GameScreen.type.ts';
import { questionBox } from './DIsplay.style.ts';

/**
 * Props for the Display component.
 */
interface DisplayProps {
  /** The selected category content, including type and metadata. */
  category?: CategoryContent;
  /** The current trivia question being displayed. */
  currentQuestion?: Question;
  /** Indicates if the game is currently in progress. */
  inGame: boolean;
  /** Function to trigger the start of the game. */
  onStartGame: () => void;
  /** The current transcript of the player's voice input. */
  transcript: string;
  /** Flag indicating if an error has occurred. */
  hasError: boolean;
  /** Optional error message to display when `hasError` is true. */
  errorMessage?: string;
}

/**
 * Display component renders the current state of the game, including the category,
 * trivia question, and voice transcript. It also handles error messages and loading
 * states.
 *
 * @param {DisplayProps} props - Component props
 */
export const Display = ({
  category,
  currentQuestion,
  inGame,
  onStartGame,
  transcript,
  hasError,
  errorMessage,
}: DisplayProps) => {
  // Show loading state when category or question data is unavailable
  if (!category || !currentQuestion)
    return <Typography variant="h3">Loading...</Typography>;

  // Show an error alert if an error has occurred
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
        <GamePreview category={category} onStartGame={onStartGame} />
      ) : (
        <>
          <TriviaQuestion type={category.type} question={currentQuestion.question} />
          <Typography variant={'subtitle2'} color={'textSecondary'}>
            transcript: {transcript}
          </Typography>
          <Typography variant={'caption'}>
            Press <b>Space</b> or say <b>Next</b> to skip question
          </Typography>
        </>
      )}
    </Box>
  );
};
