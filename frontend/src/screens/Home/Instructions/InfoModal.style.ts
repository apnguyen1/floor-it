import { SxProps, Theme } from '@mui/material';

export const infoButton = (): SxProps<Theme> => ({
  borderRadius: '75px',
  fontSize: '15px',
  marginBottom: '15px',
  backgroundColor: '#383FC2',
  color: 'white',
  padding: '8px 20px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 8px rgba(56, 63, 194, 0.3)',
  '&:hover': {
    backgroundColor: '#2d33a3',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(56, 63, 194, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
});

export const modalBox = (): SxProps<Theme> => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '800px' },
  maxHeight: '90vh',
  backgroundColor: '#fff',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  borderRadius: '20px',
  padding: '30px',
  overflow: 'auto',
});

export const closeButton = (): SxProps<Theme> => ({
  position: 'absolute',
  top: '15px',
  right: '15px',
  minWidth: 'auto',
  padding: '8px',
  borderRadius: '50%',
});

export const closeIcon = (): SxProps<Theme> => ({
  fontSize: '28px',
  color: '#383FC2',
});

export const modalTitle = (): SxProps<Theme> => ({
  color: '#383FC2',
  fontWeight: 'bold',
  marginBottom: '20px',
  position: 'relative',
  paddingBottom: '10px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '80px',
    height: '4px',
    backgroundColor: '#59ffe9',
    borderRadius: '2px',
  },
});

export const sectionTitle = (): SxProps<Theme> => ({
  color: '#383FC2',
  fontWeight: 'bold',
  marginTop: '20px',
  marginBottom: '10px',
});

export const instructionBox = (): SxProps<Theme> => ({
  backgroundColor: 'rgba(89, 255, 233, 0.1)',
  padding: '15px',
  borderRadius: '10px',
  marginBottom: '20px',
  border: '1px solid rgba(89, 255, 233, 0.3)',
});

export const keyPoint = (): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '12px',
});

export const keyPointIcon = (): SxProps<Theme> => ({
  color: '#383FC2',
  marginRight: '10px',
  marginTop: '4px',
});

export const keyPointText = (): SxProps<Theme> => ({
  flex: 1,
});
