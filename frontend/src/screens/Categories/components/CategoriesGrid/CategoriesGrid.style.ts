import { SxProps, Theme } from '@mui/material';

export const gridContainer = (): SxProps<Theme> => ({
  flex: 1,
  overflowY: 'auto',
});

export const gridContent = (): SxProps<Theme> => ({
  py: 2,
});

export const gridLayout = (): SxProps<Theme> => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 3,
  justifyContent: 'flex-start',
});

export const gridItem = (): SxProps<Theme> => ({
  width: {
    xs: '100%',
    sm: 'calc((100% - 24px) / 2)',
    md: 'calc((100% - 48px) / 3)',
    lg: 'calc((100% - 96px) / 5)',
  },
  flexShrink: 0,
  flexGrow: 0,
});
