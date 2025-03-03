import { SxProps, Theme } from '@mui/material';

export const searchBarContainer = (): SxProps<Theme> => ({
  py: 4,
});

export const searchBarContent = (): SxProps<Theme> => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 2,
});

export const titleContainer = (): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
});

export const searchField = (): SxProps<Theme> => ({
  width: 300,
  backgroundColor: 'white',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
  },
});
