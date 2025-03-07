import { SxProps, Theme } from '@mui/material';

export const chipContainer = (): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 2,
  py: 1,
  backgroundColor: 'primary.light',
  borderRadius: '16px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
});

export const chipText = (): SxProps<Theme> => ({
  color: 'white',
  fontWeight: 500,
});

export const removeButton = (): SxProps<Theme> => ({
  color: 'white',
  p: 0.5,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export const closeIcon = (): SxProps<Theme> => ({
  fontSize: '16px',
  color: 'white',
});
