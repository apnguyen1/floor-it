import { useEffect, useState } from 'react';
import { Box, IconButton, Modal, Paper, Tooltip, Typography } from '@mui/material';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import {
  actionButtons,
  confettiContainer,
  displayNextCategoryName,
  iconButton,
  winnerPaper,
  winningModalBox,
} from './WinningModal.style';
import { PlayerState } from '../../../../types/global.type.ts';
import { useApp } from '../../../../hooks/useApp.ts';
import { ScreenType } from '../../../../constants/screens.ts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CategoryIcon from '@mui/icons-material/Category';

/**
 * Props for the Winning Modal component.
 */
interface WinningModalProps {
  // Whether the modal is currently visible
  isOpen: boolean;
  // The player state of the winner (contains name and color)
  winner?: PlayerState;
  // Callback function to close the modal
  onClose: () => void;
  // The next category name to play (if available)
  nextCategoryName?: string;
  // Category progress (current/total)
  categoryProgress?: { current: number; total: number };
  // Handler for proceeding to the next category
  onPlayNextCategory?: () => void;
  // Handler for replaying the current category
  onReplayCategory?: () => void;
}

/**
 * Modal that is displayed when the user wins
 *
 * @param {WinningModalProps}: props - Component props
 */
const WinningModal = ({
  isOpen,
  winner,
  onClose,
  nextCategoryName,
  categoryProgress,
  onPlayNextCategory,
  onReplayCategory,
}: WinningModalProps) => {
  const { width, height } = useWindowSize();
  const { setScreen } = useApp();
  const [showConfetti, setShowConfetti] = useState(true);

  const hasNextCategory = !!nextCategoryName;
  const isLastCategory =
    categoryProgress && categoryProgress.current === categoryProgress.total;

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleBackToCategories = () => {
    onClose();
    setScreen(ScreenType.Categories);
  };

  if (!winner) return null;

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="winning-modal-title">
      <>
        {/* Confetti positioned relative to the viewport, not the modal */}
        {showConfetti && (
          <Box sx={confettiContainer()}>
            <Confetti
              width={width}
              height={height}
              recycle={true}
              numberOfPieces={500}
              colors={[winner.color, '#FFD700', '#FFFFFF', '#383FC2']}
            />
          </Box>
        )}

        {/* Modal content */}
        <Box className="winning-modal-box" sx={winningModalBox()}>
          <Paper elevation={3} sx={winnerPaper(winner.color)}>
            <Typography
              id="winning-modal-title"
              variant="h3"
              component="h2"
              gutterBottom
            >
              Congratulations!
            </Typography>
            <Typography variant="h4" gutterBottom>
              {winner.name} Wins!
            </Typography>

            {categoryProgress && (
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Category {categoryProgress.current} of {categoryProgress.total}{' '}
                completed
              </Typography>
            )}

            {hasNextCategory ? (
              <Box sx={{ mt: 2, mb: 1 }}>
                <Typography variant="body1">Up next:</Typography>
                <Typography variant="h6" sx={displayNextCategoryName()}>
                  <EmojiEventsIcon />
                  {nextCategoryName}
                </Typography>
              </Box>
            ) : isLastCategory ? (
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                You've completed all categories!
              </Typography>
            ) : null}
          </Paper>

          <Box sx={actionButtons()}>
            {/* Back to Categories */}
            <Tooltip title="Back to Categories" arrow placement="top">
              <IconButton
                onClick={handleBackToCategories}
                color="primary"
                sx={iconButton()}
                aria-label="Back to Categories"
              >
                <CategoryIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            {/* Replay Current Category */}
            {onReplayCategory && (
              <Tooltip title="Play This Category Again" arrow placement="top">
                <IconButton
                  onClick={onReplayCategory}
                  color="primary"
                  sx={iconButton()}
                  aria-label="Play this category again"
                >
                  <ReplayIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            )}

            {/* Play Next Category */}
            {hasNextCategory && onPlayNextCategory && (
              <Tooltip title="Play Next Category" arrow placement="top">
                <IconButton
                  onClick={onPlayNextCategory}
                  color="success"
                  sx={iconButton()}
                  aria-label="Play next category"
                >
                  <PlayArrowIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default WinningModal;
