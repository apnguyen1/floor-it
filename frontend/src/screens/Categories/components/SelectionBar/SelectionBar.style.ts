import { SxProps, Theme } from '@mui/material';

export const selectionBarContainer = (): SxProps<Theme> => ({
  borderTop: '1px solid',
  borderColor: 'divider',
  p: 2,
  backgroundColor: 'background.paper',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
});

export const selectedCategoriesContainer = (): SxProps<Theme> => ({
  flex: 1,
  display: 'flex',
  gap: 1,
  overflowX: 'auto',
  py: 1,
});

export const categoryCounter = (isMax: boolean): SxProps<Theme> => ({
  minWidth: 'fit-content',
  color: isMax ? 'error.main' : 'text.secondary',
});
