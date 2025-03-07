import { SxProps, Theme } from '@mui/material';

export const searchBarContainer = (): SxProps<Theme> => ({
  py: 3,
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(5px)',
  position: 'sticky',
  top: 0,
  zIndex: 10,
});

export const searchBarContent = (): SxProps<Theme> => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 2,
  flexDirection: { xs: 'column', sm: 'row' },
});

export const titleContainer = (): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
});

export const categoryTitle = (): SxProps<Theme> => ({
  fontWeight: 'bold',
  color: 'primary.main',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -5,
    left: 2,
    width: '40px',
    height: '3px',
    backgroundColor: '#000000',
    borderRadius: '5px',
  },
});

export const backButton = (): SxProps<Theme> => ({
  color: 'primary.main',
  background: 'rgba(255, 255, 255, 0.7)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.9)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  transition: 'all 0.2s ease',
});

export const searchField = (): SxProps<Theme> => ({
  width: { xs: '100%', sm: 300 },
  backgroundColor: 'white',
  borderRadius: '50px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.2s ease',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  '&:hover': {
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  '&.Mui-focused': {
    boxShadow: '0 4px 20px rgba(89, 255, 233, 0.2)',
    borderColor: 'primary.main',
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});
