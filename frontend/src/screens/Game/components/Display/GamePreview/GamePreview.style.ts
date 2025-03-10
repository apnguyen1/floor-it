import { SxProps, Theme } from '@mui/material';

export const gamePreview = (): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: 3,
  padding: 3,
});

export const categoryTitle = (): SxProps<Theme> => ({
  fontSize: '2.2rem',
  fontWeight: 'bold',
  color: 'primary.main',
  textAlign: 'center',
  marginBottom: 1,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    backgroundColor: 'primary.main',
    borderRadius: '2px',
  },
});

export const previewImage = (): SxProps<Theme> => ({
  width: '80%',
  maxHeight: '280px',
  objectFit: 'contain',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  border: '4px solid white',
  margin: '16px 0',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

export const categoryDescription = (): SxProps<Theme> => ({
  fontSize: '1.2rem',
  fontWeight: 500,
  color: 'text.secondary',
  marginBottom: 3,
  textAlign: 'center',
  maxWidth: '80%',
});

export const buttonContainer = (): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  marginTop: 2,
});

export const previewButton = (): SxProps<Theme> => ({
  padding: '12px',
  borderRadius: '50%',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  bgcolor: 'background.paper',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
});
