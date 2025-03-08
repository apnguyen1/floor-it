import { SxProps, Theme } from '@mui/material';

export const countdownBox = (color: string, timeRemaining: number): SxProps<Theme> => ({
  marginTop: 1,
  fontSize: timeRemaining < 10 ? '3.5rem' : '3rem',
  fontWeight: 'bold',
  color: timeRemaining < 10 ? '#e53935' : color,
  transition: 'all 0.3s ease',
  animation: timeRemaining < 10 ? 'pulseAndShake 1s infinite' : 'none',
  '@keyframes pulseAndShake': {
    '0%': {
      transform: 'scale(1)',
      textShadow: '0 0 0 rgba(229, 57, 53, 0)',
    },
    '50%': {
      transform: 'scale(1.1) translateX(-2px)',
      textShadow: '0 0 10px rgba(229, 57, 53, 0.5)',
    },
    '75%': {
      transform: 'scale(1.1) translateX(2px)',
    },
    '100%': {
      transform: 'scale(1)',
      textShadow: '0 0 0 rgba(229, 57, 53, 0)',
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
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
    stroke:
      remaining < 10
        ? '#e53935' // Error red
        : remaining < 20
          ? '#FF9800' // Warning orange for 10-20 seconds
          : playerColor, // Player color for > 20 seconds
    strokeWidth: remaining < 10 ? 5 : 4, // Thicker stroke when time is running low
    animation: remaining < 10 ? 'timerPulse 1s infinite alternate' : 'none',
    '@keyframes timerPulse': {
      from: {
        strokeOpacity: 0.7,
        strokeWidth: 4,
      },
      to: {
        strokeOpacity: 1,
        strokeWidth: 5,
      },
    },
  },
});

export const timerBox = (): SxProps<Theme> => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  my: 2,
});
