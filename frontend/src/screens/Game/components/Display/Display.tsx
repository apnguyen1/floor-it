import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  CircularProgress,
  TextField,
  Typography,
  Snackbar,
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
import { ChangeEvent, useState, useEffect } from 'react';

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
  handleTextInputFocus: () => void /** Handles focus on the text input */;
  handleTextInputBlur: () => void /** Handles blur on the text input */;
  /** Reference to the text input box */
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
  handleTextInputFocus,
  handleTextInputBlur,
  categoryProgress,
  onSkipCategory,
}: DisplayProps) => {
  const [textAnswer, setTextAnswer] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Show snackbar when there's an error
  useEffect(() => {
    if (hasError) {
      setOpenSnackbar(true);
    }
  }, [hasError]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Clear the text input when the current question changes, either from text or voice
  useEffect(() => {
    setTextAnswer('');
  }, [currentQuestion]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    setTextAnswer(answer);

    // Check for exact match (case insensitive)
    if (
      currentQuestion?.answers.some((a) => a.toLowerCase() === answer.toLowerCase())
    ) {
      onTextSubmit(answer);
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

  return (
    <>
      {/* Render Snackbar for error message */}
      {hasError && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000} // Auto hide after 4 seconds
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage + ' Defaulting to text input.'}
          </Alert>
        </Snackbar>
      )}
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
            {useTextInput && (
              <TextField
                autoFocus={hasError}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
                value={textAnswer}
                onChange={handleTextChange}
                placeholder="Type your answer..."
                fullWidth
                sx={textInput()}
              />
            )}
            {
              // Render an error box instead of the transcript if speech recognition cannot be used
              !hasError && (
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={transcriptBox()}
                >
                  <strong>You said:</strong>{' '}
                  {transcript || 'Waiting for your answer...'}
                </Typography>
              )
            }
            <Box className={'help-text'} sx={helpText()}>
              <SpaceBarIcon fontSize="small" />
              <Typography>
                {!hasError ? (
                  <>
                    Press <strong>Space/Esc</strong> or say <strong>Next</strong> to
                    skip question
                  </>
                ) : (
                  <>
                    Press <strong>Esc</strong> to skip question
                  </>
                )}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
