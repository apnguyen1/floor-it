import { SxProps, Theme } from '@mui/material';

export const categoriesBox = (): SxProps<Theme> => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
});

export const categoriesContent = (): SxProps<Theme> => ({
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: { xs: '0px', md: '16px 16px 0 0' },
  boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.1)',
  margin: { xs: 0, md: '0 16px' },
  marginTop: { xs: 0, md: '16px' },
  overflow: 'hidden',
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
});
