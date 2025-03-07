import { SxProps, Theme } from '@mui/material';

export const homeButtonTitle = (): SxProps<Theme> => ({
  position: 'absolute',
  top: '15px',
  left: '15px',
  fontFamily: 'Squada One',
  fontSize: '2rem',
  color: '#59ffe9',
  textShadow: '2px 2px 0px #383fc2',
  cursor: 'pointer',
  zIndex: 1000,
  padding: '5px 15px',
  borderRadius: '5px',
  transition: 'all 0.3s ease',
  '&:hover': {
    textShadow: '3px 3px 0px #383fc2',
    transform: 'scale(1.05)',
  },
  '@media (max-width: 600px)': {
    fontSize: '1.5rem',
  },
});
