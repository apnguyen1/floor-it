import { SxProps, Theme } from '@mui/material';

export const homeScreenBox = (): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '30%',
    left: '10%',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'rgba(89, 255, 233, 0.2)',
    filter: 'blur(5px)',
    animation: 'float 8s infinite ease-in-out',
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '20%',
    right: '15%',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: 'rgba(56, 63, 194, 0.15)',
    filter: 'blur(8px)',
    animation: 'float 12s infinite ease-in-out',
  },

  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0) scale(1)',
    },
    '50%': {
      transform: 'translateY(-20px) scale(1.5)',
    },
  },
});

export const homeScreenTitle = (): SxProps<Theme> => ({
  textAlign: 'center',
  fontFamily: 'Squada One',
  fontSize: { xs: '100px', sm: '150px', md: '200px' },
  fontWeight: 'bold',
  color: '#59ffe9',
  textShadow: '10px 10px 0px #383fc2',
  position: 'relative',
  letterSpacing: '4px',
  mb: 4,

  // Animation
  animation: 'titlePulse 4s infinite ease-in-out',

  '@keyframes titlePulse': {
    '0%, 100%': {
      transform: 'scale(1)',
      textShadow: '10px 10px 0px #383fc2',
    },
    '50%': {
      transform: 'scale(1.02)',
      textShadow: '12px 12px 0px #383fc2',
    },
  },

  // Add decorative elements
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150px',
    height: '4px',
    background: '#59ffe9',
    borderRadius: '4px',
  },
});

export const homeScreenPlayButton = (): SxProps<Theme> => ({
  borderRadius: '75px',
  fontSize: { xs: '18px', sm: '25px' },
  fontWeight: 'bold',
  marginBottom: '15px',
  width: { xs: '200px', sm: '250px' },
  height: { xs: '50px', sm: '60px' },
  color: 'white',
  backgroundColor: '#383FC2',
  boxShadow: '0 8px 20px rgba(56, 63, 194, 0.4)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: '#2d33a3',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 28px rgba(56, 63, 194, 0.5)',
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  // Shine effect on hover
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-60%',
    width: '200%',
    height: '200%',
    opacity: 0,
    transform: 'rotate(30deg)',
    background: 'rgba(255, 255, 255, 0.13)',
    transition: 'opacity 0.3s ease',
  },

  '&:hover::after': {
    opacity: 1,
  },
});

export const buttonsContainer = (): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 2,
  position: 'relative',
  zIndex: 2,
});
