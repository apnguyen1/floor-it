import { SxProps, Theme } from '@mui/material';

export const textQuestion = (): SxProps<Theme> => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: 'primary.main',
  textAlign: 'center',
  maxWidth: '90%',
  lineHeight: 1.3,
  position: 'relative',
  padding: '12px 0',
  margin: '0 auto',
  display: 'block',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    height: '2px',
    width: '40px',
    backgroundColor: 'primary.light',
  },
  '&::before': {
    top: 0,
    left: 'calc(50% - 20px)',
  },
  '&::after': {
    bottom: 0,
    left: 'calc(50% - 20px)',
  },
});

export const imageQuestion = (): SxProps<Theme> => ({
  maxWidth: '90%',
  maxHeight: '350px',
  objectFit: 'contain',
  borderRadius: '8px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  border: '3px solid white',
  display: 'block',
  margin: '0 auto',
});
