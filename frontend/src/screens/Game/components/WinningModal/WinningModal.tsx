import { useEffect, useState } from 'react';
import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import {
  actionButton,
  buttonContainer,
  confettiContainer,
  winnerPaper,
  winningModalBox,
} from './WinningModal.style';
import { PlayerState } from '../../../../types/global.type.ts';
import { useApp } from '../../../../hooks/useApp.ts';
import { ScreenType } from '../../../../constants/screens.ts';

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
}

/**
 * Modal that is displayed when the user wins
 *
 * @param {WinningModalProps}: props - Component props
 */
const WinningModal = ({ isOpen, winner, onClose }: WinningModalProps) => {
  const { width, height } = useWindowSize();
  const { setScreen } = useApp();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePlayAgain = () => {
    onClose();
    setScreen(ScreenType.Game);
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
            <Typography variant="subtitle1">
              Great job answering those trivia questions!
            </Typography>
          </Paper>

          <Box sx={buttonContainer()}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePlayAgain}
              sx={actionButton()}
            >
              Play Again
            </Button>
            {/*  TODO: continue to next category and continue track of player points
                  ticket-116 & #115*/}
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default WinningModal;
