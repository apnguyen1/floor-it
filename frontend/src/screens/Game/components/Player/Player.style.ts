import { SxProps, Theme } from '@mui/material';

export const playerBox = (color: string, isActive: boolean): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '22%',
  minHeight: '600px',
  padding: 3,
  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.6)',
  borderRadius: '16px',
  boxShadow: isActive
    ? '0 8px 32px rgba(0, 0, 0, 0.15)'
    : '0 4px 16px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  border: isActive ? `3px solid ${color}` : 'none',
  gap: 3,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '6px',
    backgroundColor: color,
    borderRadius: '3px 3px 0 0',
  },
});

export const playerAvatar = (playerColor: string): SxProps<Theme> => ({
  bgcolor: playerColor,
  transition: 'background-color 0.3s ease',
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
});

export const activeTurn = (): SxProps<Theme> => ({
  marginTop: 2,
  fontSize: '1.2rem',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
});

export const micIcon = (isListening: boolean): SxProps<Theme> => ({
  fontSize: '2.2rem',
  color: isListening ? '#4caf50' : '#f44336',
  animation: isListening ? 'pulse 1.5s infinite' : 'none',
});
