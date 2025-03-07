import { SxProps, Theme } from '@mui/material';

export const categoryWidgetContainer = (isSelected: boolean): SxProps<Theme> => ({
  width: '100%',
  aspectRatio: '1/1',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
  },
  border: isSelected ? '2px solid' : 'none',
  borderColor: isSelected ? 'primary.main' : 'transparent',
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  background: isSelected
    ? 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))'
    : 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(250,250,250,0.8))',
  backdropFilter: 'blur(10px)',
  boxShadow: isSelected
    ? '0 8px 25px rgba(56, 63, 194, 0.15)'
    : '0 5px 15px rgba(0, 0, 0, 0.08)',
});

export const selectionIndicator = (): SxProps<Theme> => ({
  position: 'absolute',
  top: 8,
  right: 8,
  color: 'primary.main',
  backgroundColor: 'white',
  borderRadius: '50%',
  padding: '2px',
  boxShadow: '0 2px 10px rgba(56, 63, 194, 0.2)',
  zIndex: 2,
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(56, 63, 194, 0.4)',
    },
    '70%': {
      boxShadow: '0 0 0 6px rgba(56, 63, 194, 0)',
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(56, 63, 194, 0)',
    },
  },
});

export const contentContainer = (): SxProps<Theme> => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const headerContainer = (): SxProps<Theme> => ({
  p: 2,
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  background: 'rgba(255, 255, 255, 0.7)',
});

export const categoryTitle = (): SxProps<Theme> => ({
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: '#383FC2',
});

export const categoryDescription = (): SxProps<Theme> => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  mt: 0.5,
  fontSize: '0.85rem',
});

export const imageContainer = (): SxProps<Theme> => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  p: 2,
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.5)',
});

export const categoryImage = (): SxProps<Theme> => ({
  maxWidth: '90%',
  maxHeight: '90%',
  objectFit: 'contain',
  width: 'auto',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.1))',
});
