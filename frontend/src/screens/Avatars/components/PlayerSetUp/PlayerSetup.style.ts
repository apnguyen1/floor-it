import { SxProps, Theme } from '@mui/material';

export const playerBox = (backgroundColor: string): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  padding: 3,
  borderRadius: 2,
  backgroundColor,
  width: 250, // Fixed width for consistency
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-3px)',
  },
});

export const playerAvatar = (backgroundColor: string): SxProps<Theme> => ({
  width: 56,
  height: 56,
  backgroundColor: 'white',
  color: backgroundColor,
  border: `2px solid ${backgroundColor}`,
  fontSize: '1.5rem',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
});

export const playerNameField = (): SxProps<Theme> => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderRadius: 1,
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
    },
  },
});
