import { SxProps, Theme } from '@mui/material';

export const winningModalBox = (): SxProps<Theme> => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600 },
  maxWidth: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  outline: 'none',
  textAlign: 'center',
  zIndex: 1, // Ensure modal content is above confetti
});

export const confettiContainer = (): SxProps<Theme> => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none', // Let clicks pass through
  zIndex: 0, // Below the modal content
});

export const winnerPaper = (color: string): SxProps<Theme> => ({
  p: 3,
  mb: 3,
  bgcolor: color,
  color: 'white',
  borderRadius: 2,
});

export const buttonContainer = (): SxProps<Theme> => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 2,
  flexWrap: 'wrap',
});

export const actionButton = (): SxProps<Theme> => ({
  minWidth: 200,
});
