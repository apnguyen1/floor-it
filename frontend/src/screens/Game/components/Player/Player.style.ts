import { SxProps, Theme } from '@mui/material';

export const playerBox = (): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20%',
  minHeight: '495px',
  padding: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '10px',
});

export const playerAvatar = (isActive: boolean): SxProps<Theme> => ({
  bgcolor: isActive ? 'primary.main' : 'grey.400',
  transition: 'background-color 0.3s ease',
});
