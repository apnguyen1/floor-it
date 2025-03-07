import { SxProps, Theme } from '@mui/material';

export const categoryWidgetContainer = (isSelected: boolean): SxProps<Theme> => ({
  width: '100%',
  aspectRatio: '1/1',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  border: isSelected ? '2px solid' : 'none',
  borderColor: 'primary.main',
  position: 'relative',
});

export const selectionIndicator = (): SxProps<Theme> => ({
  position: 'absolute',
  top: 8,
  right: 8,
  color: 'primary.main',
  backgroundColor: 'white',
  borderRadius: '50%',
});

export const contentContainer = (): SxProps<Theme> => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const headerContainer = (): SxProps<Theme> => ({
  p: 1.5,
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

export const categoryTitle = (): SxProps<Theme> => ({
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const categoryDescription = (): SxProps<Theme> => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const imageContainer = (): SxProps<Theme> => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  p: 2,
  overflow: 'hidden',
});

export const categoryImage = (): React.CSSProperties => ({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  width: 'auto',
  height: 'auto',
});
