import { SxProps, Theme } from '@mui/material';

export const selectionBarContainer = (): SxProps<Theme> => ({
  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
  p: { xs: 2, md: 3 },
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
  position: 'relative',
  zIndex: 2,
  flexDirection: { xs: 'column', sm: 'row' },
  animation: 'slideUp 0.3s ease-out',
  '@keyframes slideUp': {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
});

export const selectedCategoriesContainer = (): SxProps<Theme> => ({
  flex: 1,
  display: 'flex',
  gap: 1.5,
  overflowX: 'auto',
  py: 1,
  px: { xs: 1, sm: 0 },
  width: { xs: '100%', sm: 'auto' },
  '&::-webkit-scrollbar': {
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.03)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.2)',
    },
  },
});

export const categoryCounter = (isMax: boolean): SxProps<Theme> => ({
  minWidth: 'fit-content',
  color: isMax ? 'error.main' : 'primary.main',
  backgroundColor: isMax ? 'rgba(244, 67, 54, 0.1)' : 'rgba(56, 63, 194, 0.1)',
  padding: '4px 12px',
  borderRadius: '16px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const readyButton = (): SxProps<Theme> => ({
  minWidth: { xs: '100%', sm: 120 },
  borderRadius: '50px',
  py: 1,
  px: 3,
  backgroundColor: '#383FC2',
  color: 'white',
  fontWeight: 'bold',
  boxShadow: '0 4px 15px rgba(56, 63, 194, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#2d33a3',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(56, 63, 194, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
});
