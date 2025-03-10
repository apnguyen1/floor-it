import { SxProps, Theme } from '@mui/material';

export const questionBox = (): SxProps<Theme> => ({
  flex: 2,
  textAlign: 'center',
  padding: 4,
  backgroundColor: 'white',
  borderRadius: '16px',
  maxWidth: '100%',
  height: '600px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 3,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
});

export const questionContent = (): SxProps<Theme> => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  flex: 1,
  minHeight: 0,
});

export const transcriptBox = (): SxProps<Theme> => ({
  marginTop: 'auto',
  padding: '10px 16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  width: '100%',
  fontStyle: 'italic',
  maxHeight: '80px',
  overflow: 'auto',
  textAlign: 'left',
});

export const helpText = (): SxProps<Theme> => ({
  marginTop: 1,
  fontSize: '0.8rem',
  color: 'text.secondary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
});

export const skipPenalty = (): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
});

export const textInput = (): SxProps<Theme> => ({
  backgroundColor: 'white',
  borderRadius: '8px',
  marginTop: 'auto',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
  },
});

export const categoryChip = (): SxProps<Theme> => ({
  position: 'absolute',
  top: 5,
  left: 5,
  backgroundColor: 'primary.main',
  color: 'white',
  fontWeight: 'bold',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  '& .MuiChip-icon': {
    color: 'white',
  },
  animation: 'fadeIn 0.5s ease-in',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
});
