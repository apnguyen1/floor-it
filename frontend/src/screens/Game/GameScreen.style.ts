import { SxProps, Theme } from '@mui/material';

export const gameBox = (players: {
  P1: { color: string; name: string };
  P2: { color: string; name: string };
}): SxProps<Theme> => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  padding: 2,
  borderRadius: 0,
  position: 'relative',
  background: `linear-gradient(110deg, ${players.P1.color} 0%, ${players.P1.color} 48%, #ffffff 48%, #ffffff 52%, ${players.P2.color} 52%, ${players.P2.color} 100%)`,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(2px)',
    zIndex: 0,
  },
});

export const gameContent = (): SxProps<Theme> => ({
  display: 'flex',
  width: '100%',
  maxWidth: 1200,
  height: '85vh',
  position: 'relative',
  zIndex: 1,
  gap: 2,
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const backButton = (): SxProps<Theme> => ({
  position: 'absolute',
  top: 20,
  left: 20,
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  boxShadow: 2,
  zIndex: 2,
});

export const settingButton = (): SxProps<Theme> => ({
  position: 'absolute',
  top: 20,
  right: 20,
  zIndex: 2,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  boxShadow: 2,
});
