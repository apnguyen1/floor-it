// Styles
import { SxProps, Theme } from '@mui/material';

export const indicatorContainer = (): SxProps<Theme> => ({
  display: 'flex',
  gap: 2,
  justifyContent: 'center',
  mb: 3,
  position: 'absolute',
  top: 60,
  left: 0,
  right: 0,
  zIndex: 10,
});

export const categoryCircle = (
  color: string,
  isCurrent: boolean,
  isWon: boolean,
): SxProps<Theme> => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  border: `2px solid ${color}`,
  backgroundColor: isWon
    ? color
    : isCurrent
      ? 'rgba(255, 255, 255, 0.8)'
      : 'transparent',
  opacity: isCurrent ? 1 : 0.7,
  boxShadow: isCurrent ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none',
  cursor: 'default',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});
