import { SxProps, Theme } from '@mui/material';

export const countdownBox = (color: string, timeRemaining: number): SxProps<Theme> => ({
  marginTop: 1,
  fontSize: timeRemaining < 10 ? '3.5rem' : '3rem',
  fontWeight: 'bold',
  color: timeRemaining < 10 ? '#e53935' : color,
  transition: 'all 0.3s ease',
  animation: timeRemaining < 10 ? 'pulse 1s infinite' : 'none',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
});

export const circularProgress = (
  playerColor: string,
  isActive: boolean,
  remaining: number,
): SxProps<Theme> => ({
  color: remaining < 10 ? 'error.main' : playerColor,
  opacity: isActive ? 1 : 0.3,
  transition: 'all 0.3s ease',
});

export const timerBox = (): SxProps<Theme> => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  my: 2,
});
