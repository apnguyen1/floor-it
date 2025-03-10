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
  zIndex: 1,
});

export const confettiContainer = (): SxProps<Theme> => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 0,
});

export const winnerPaper = (color: string): SxProps<Theme> => ({
  p: 3,
  mb: 3,
  bgcolor: color,
  color: 'white',
  borderRadius: 2,
  boxShadow: `0 8px 32px ${color}40`,
});

export const actionButtons = (): SxProps<Theme> => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 3,
  flexWrap: 'wrap',
  mt: 2,
});

export const iconButton = (): SxProps<Theme> => ({
  p: 2,
  bgcolor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
});

export const displayNextCategoryName = (): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
});
