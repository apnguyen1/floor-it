import { SxProps, Theme } from '@mui/material';

export const timerBox = (color: string, timeRemaining: number): SxProps<Theme> => ({
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
