import { SxProps, Theme } from '@mui/material';

export const categoriesBox = (): SxProps<Theme> => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundImage: 'url(/app_background.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
});

export const categoriesContent = (): SxProps<Theme> => ({
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});
