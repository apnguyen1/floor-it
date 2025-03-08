import { SxProps, Theme } from '@mui/material';

export const gridContainer = (): SxProps<Theme> => ({
  flex: 1,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.3)',
    },
  },
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05)',
});

export const gridContent = (): SxProps<Theme> => ({
  py: 3,
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
  animation: 'fadeInUp 0.5s ease-out',
  animationFillMode: 'both',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  // Add staggered animation delay based on index
  '&:nth-of-type(1)': { animationDelay: '0.05s' },
  '&:nth-of-type(2)': { animationDelay: '0.1s' },
  '&:nth-of-type(3)': { animationDelay: '0.15s' },
  '&:nth-of-type(4)': { animationDelay: '0.2s' },
  '&:nth-of-type(5)': { animationDelay: '0.25s' },
  '&:nth-of-type(6)': { animationDelay: '0.3s' },
  '&:nth-of-type(7)': { animationDelay: '0.35s' },
  '&:nth-of-type(8)': { animationDelay: '0.4s' },
  '&:nth-of-type(9)': { animationDelay: '0.45s' },
  '&:nth-of-type(10)': { animationDelay: '0.5s' },
});
