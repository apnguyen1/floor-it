import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import TriviaQuestion from './GameDisplay/TriviaQuestion.tsx';
import { GamePreview } from './GamePreview/GamePreview.tsx';
import { CategoryContent, Question } from '../../GameScreen.type.ts';
import {
  categoryChip,
  helpText,
  questionBox,
  questionContent,
  skipPenalty,
  textInput,
  transcriptBox,
} from './Display.style.ts';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import CategoryIcon from '@mui/icons-material/Category';
import { ChangeEvent, useState } from 'react';

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
  /** Handles user penalty if skipped */
  isSkipped: boolean;
  /** Whether to use text input instead of voice */
  useTextInput: boolean;
  /** Callback when text answer is submitted */
  onTextSubmit: (answer: string) => void;
  /** Category progress information */
  categoryProgress?: { current: number; total: number };
  /** Function to skip to the next category */
  onSkipCategory?: () => void;
  /** Whether there's a next category available */
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
  isSkipped,
  useTextInput,
  onTextSubmit,
  categoryProgress,
  onSkipCategory,
}: DisplayProps) => {
  const [textAnswer, setTextAnswer] = useState('');

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    setTextAnswer(answer);

    // Check for exact match (case insensitive)
    if (
      currentQuestion?.answers.some((a) => a.toLowerCase() === answer.toLowerCase())
    ) {
      onTextSubmit(answer);
      setTextAnswer('');
    }
  };

  const isLoading = !category && !currentQuestion;

  // Show loading state when category or question data is unavailable
  if (isLoading) {
    return (
      <Box sx={questionBox()}>
        <CircularProgress size={60} color="primary" />
        <Typography variant="h5" color="primary.main" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // Show an error alert if an error has occurred
  if (hasError) {
    return (
      <Box sx={questionBox()}>
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="question-box" sx={questionBox()}>
      {categoryProgress && category && (
        <Chip
          icon={<CategoryIcon />}
          label={`(${categoryProgress.current}/${categoryProgress.total})`}
          sx={categoryChip()}
        />
      )}
      {!inGame && category ? (
        <GamePreview
          category={category}
          categoryProgress={categoryProgress}
          onStartGame={onStartGame}
          onSkipCategory={onSkipCategory}
        />
      ) : (
        <>
          <Box className={'question-content'} sx={questionContent()}>
            {isSkipped && currentQuestion ? (
              <Box className={'skip-penalty'} sx={skipPenalty()}>
                <TimerOffIcon sx={{ fontSize: 50, color: '#f44336' }} />
                <Typography variant="h4" color="error" fontWeight="bold">
                  Skip Penalty!
                </Typography>
                <Typography variant="subtitle1">The correct answer is:</Typography>
                <Typography variant="h3" color="primary.main" fontWeight="bold">
                  {currentQuestion.answers[0]}
                </Typography>
              </Box>
            ) : (
              currentQuestion &&
              category && (
                <TriviaQuestion
                  type={category.type}
                  question={currentQuestion.question}
                />
              )
            )}
          </Box>
          {useTextInput ? (
            <TextField
              value={textAnswer}
              onChange={handleTextChange}
              placeholder="Type your answer..."
              autoFocus
              fullWidth
              sx={textInput()}
            />
          ) : (
            <Typography
              variant={'subtitle2'}
              color={'textSecondary'}
              sx={transcriptBox()}
            >
              <strong>You said:</strong> {transcript || 'Waiting for your answer...'}
            </Typography>
          )}
          <Box className={'help-text'} sx={helpText()}>
            <SpaceBarIcon fontSize="small" />
            <Typography>
              Press <strong>Space</strong> or say <strong>Next</strong> to skip question
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
