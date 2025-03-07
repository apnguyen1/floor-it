import { SxProps, Theme } from '@mui/material';

export const chipContainer = (): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 2,
  py: 1,
  backgroundColor: '#383FC2',
  borderRadius: '50px',
  boxShadow: '0 2px 10px rgba(56, 63, 194, 0.2)',
  transition: 'all 0.2s ease',
  animation: 'scaleIn 0.3s ease-out',
  '@keyframes scaleIn': {
    from: { transform: 'scale(0.9)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(56, 63, 194, 0.25)',
    backgroundColor: '#4349d1',
  },
});

export const chipText = (): SxProps<Theme> => ({
  color: 'white',
  fontWeight: 500,
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
});

export const removeButton = (): SxProps<Theme> => ({
  color: 'white',
  p: 0.5,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  marginLeft: '4px',
  marginRight: '-8px',
});

export const closeIcon = (): SxProps<Theme> => ({
  fontSize: '16px',
  color: 'white',
  filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))',
});
