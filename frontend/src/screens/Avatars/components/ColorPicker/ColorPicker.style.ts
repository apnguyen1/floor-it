import { SxProps, Theme } from '@mui/material';

export const colorPickerButton = (): SxProps<Theme> => ({
  color: 'white',
});

export const colorMenuContainer = (): SxProps<Theme> => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: 1,
  padding: 1,
});

export const colorMenuItem = (
  color: string,
  isDisabled: boolean,
  isSelected: boolean,
): SxProps<Theme> => ({
  backgroundColor: color,
  width: '30px',
  height: '30px',
  borderRadius: '4px',
  margin: 'auto',
  display: 'block',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  textAlign: 'center',
  color: '#fff',
  textDecoration: isDisabled ? 'line-through' : 'none',
  border: isSelected ? '2px solid white' : 'none',
  boxShadow: isSelected ? '0 0 5px rgba(255, 255, 255, 0.5)' : 'none',
  position: 'relative',
  '&:hover': {
    boxShadow: isDisabled ? 'none' : '0 0 8px rgba(255, 255, 255, 0.8)',
    transform: isDisabled ? 'none' : 'scale(1.05)',
  },
});

export const checkmarkIcon = (): SxProps<Theme> => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '18px',
  textShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)',
});
