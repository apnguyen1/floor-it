import { SxProps, Theme } from '@mui/material';

export const playerBox = (
  color: string,
  isActive: boolean,
  inGame: boolean,
): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '22%',
  minHeight: '600px',
  padding: 3,
  backgroundColor:
    isActive && inGame ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)',
  borderRadius: '16px',
  boxShadow:
    isActive && inGame
      ? `0 8px 32px rgba(0, 0, 0, 0.15), 0 0 20px ${color}40`
      : '0 4px 16px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.5s ease',
  border: isActive && inGame ? `3px solid ${color}` : 'none',
  gap: 3,
  position: 'relative',
  overflow: 'hidden',
  '&::before':
    isActive && inGame
      ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '6px',
          backgroundColor: color,
          borderRadius: '3px 3px 0 0',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { opacity: 0.6 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.6 },
          },
        }
      : {},
});

export const playerAvatar = (
  playerColor: string,
  isActive: boolean,
  inGame: boolean,
): SxProps<Theme> => ({
  bgcolor: playerColor,
  color: 'white',
  transition: 'all 0.3s ease',
  width: isActive && inGame ? 70 : 56,
  height: isActive && inGame ? 70 : 56,
  fontSize: isActive && inGame ? '1.8rem' : '1.5rem',
  fontWeight: 'bold',
  boxShadow: isActive && inGame ? `0 0 0 4px white, 0 0 15px ${playerColor}` : 'none',
  border: `2px solid ${isActive && inGame ? 'white' : playerColor}`,
});

export const playerStatus = (isWinner: boolean): SxProps<Theme> => ({
  marginTop: 2,
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: isWinner ? '#4caf50' : '#f44336',
  backgroundColor: isWinner ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
  padding: '8px 16px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  animation: isWinner ? 'winnerPulse 1.5s infinite' : 'none',
  '@keyframes winnerPulse': {
    '0%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.4)' },
    '70%': { boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)' },
    '100%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)' },
  },
});

export const activeTurn = (): SxProps<Theme> => ({
  marginTop: 2,
  fontSize: '1.2rem',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  padding: '8px 16px',
  borderRadius: '20px',
  backgroundColor: 'rgba(56, 63, 194, 0.1)',
  animation: 'slideInUp 0.5s ease-out',
  '@keyframes slideInUp': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
});

export const micIcon = (isListening: boolean): SxProps<Theme> => ({
  fontSize: '2.2rem',
  color: isListening ? '#4caf50' : '#f44336',
  animation: isListening ? 'pulse 1.5s infinite' : 'none',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)', opacity: 1 },
    '50%': { transform: 'scale(1.1)', opacity: 0.8 },
    '100%': { transform: 'scale(1)', opacity: 1 },
  },
});

export const activePlayerIndicator = (
  isActive: boolean,
  inGame: boolean,
  color: string,
): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  position: 'relative',
  padding: isActive && inGame ? '16px' : '8px',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  ...(isActive &&
    inGame && {
      '&::after': {
        content: '""',
        position: 'absolute',
        top: -15,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: `10px solid ${color}`,
      },
    }),
});

export const playerName = (isActive: boolean, inGame: boolean): SxProps<Theme> => ({
  fontWeight: isActive && inGame ? 'bold' : 'normal',
  fontSize: isActive && inGame ? '1.1rem' : '1rem',
  color: isActive && inGame ? 'primary.main' : 'text.primary',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  marginTop: 1,
});

export const turnArrow = (isActive: boolean): SxProps<Theme> => ({
  position: 'absolute',
  [isActive ? 'right' : 'left']: -20,
  top: '50%',
  transform: 'translateY(-50%)',
  animation: 'arrowPulse 1s infinite',
  '@keyframes arrowPulse': {
    '0%': { transform: 'translateY(-50%) translateX(0)' },
    '50%': {
      transform: `translateY(-50%) translateX(${isActive ? '-5px' : '5px'})`,
    },
    '100%': { transform: 'translateY(-50%) translateX(0)' },
  },
});
