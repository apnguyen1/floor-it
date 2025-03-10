import { SxProps, Theme } from '@mui/material';

export const screenContainer = (): SxProps<Theme> => ({
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  backgroundImage: 'url(/app_background.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const contentPaper = (): SxProps<Theme> => ({
  backgroundColor: 'white',
  borderRadius: 2,
  p: 4,
  position: 'relative',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  maxWidth: '90%',
  width: '800px',
});

export const backButton = (): SxProps<Theme> => ({
  position: 'absolute',
  top: 16,
  left: 16,
  color: 'primary.main',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

export const screenTitle = (): SxProps<Theme> => ({
  textAlign: 'center',
  fontWeight: 'bold',
  mb: 4,
  fontSize: { xs: '2.5rem', md: '3rem' },
  color: 'primary.main',
});

export const playersContainer = (): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'center',
  alignItems: 'center',
  gap: { xs: 3, sm: 4 },
  mb: 4,
});

export const readyButton = (): SxProps<Theme> => ({
  minWidth: 150,
  py: 1,
  borderRadius: 5,
  fontSize: '1.1rem',
  fontWeight: 'bold',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
});
