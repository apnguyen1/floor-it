// Styles
import { SxProps, Theme } from '@mui/material';

export const indicatorContainer = (): SxProps<Theme> => ({
  display: 'flex',
  gap: 2,
  justifyContent: 'center',
  mb: 3,
  position: 'absolute',
  top: 100,
  left: 0,
  right: 0,
  zIndex: 10,
});

export const categoryCircle = (
  color: string,
  isCurrent: boolean,
  isUpcoming: boolean,
  isCompleted: boolean,
  isWon: boolean,
): SxProps<Theme> => ({
  width: 25,
  height: 25,
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  border: `2px solid ${color}`,
  backgroundColor: isWon
    ? color
    : isCurrent
      ? 'rgba(255, 255, 255, 0.8)'
      : 'transparent',

  opacity: isCurrent ? 1 : isUpcoming ? 0.5 : isCompleted ? 0.7 : 0.7,
  boxShadow: isCurrent
    ? '0 0 10px rgba(255, 255, 255, 0.5)'
    : isWon
      ? `0 0 8px ${color}40`
      : 'none',
  cursor: 'default',
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  ...(isCurrent && {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: -4,
      left: -4,
      right: -4,
      bottom: -4,
      borderRadius: '50%',
      border: '2px dashed rgba(255,255,255,0.7)',
      animation: 'spin 10s linear infinite',
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  }),
});
