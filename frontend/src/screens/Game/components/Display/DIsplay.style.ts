import { SxProps, Theme } from '@mui/material';

export const questionBox = (): SxProps<Theme> => ({
  flex: 2,
  textAlign: 'center',
  padding: '16px',
  backgroundColor: 'white',
  borderRadius: '10px',
  maxWidth: '100%',
  minHeight: '100px',
});
