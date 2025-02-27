import { SxProps, Theme } from '@mui/material';

export const settingModalBox = (): SxProps<Theme> => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  maxWidth: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  outline: 'none',
});

export const settingHeader = (): SxProps<Theme> => ({
  mb: 2,
  position: 'relative',
  pb: 2,
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '60px',
    height: '3px',
    backgroundColor: 'primary.main',
  },
});

export const closeButtonStyle = (): SxProps<Theme> => ({
  position: 'absolute',
  top: 8,
  right: 8,
  color: 'grey.500',
});

export const settingSection = (): SxProps<Theme> => ({
  mb: 3,
});

export const sectionTitle = (): SxProps<Theme> => ({
  mb: 2,
  fontWeight: 'bold',
  color: 'primary.main',
});

export const sliderContainer = (): SxProps<Theme> => ({
  px: 2,
  mt: 3,
});

export const playerSettingBox = (color: string): SxProps<Theme> => ({
  p: 2,
  mb: 2,
  border: `1px solid ${color}`,
  borderRadius: 2,
  position: 'relative',
});

export const timerValueDisplay = (): SxProps<Theme> => ({
  display: 'inline-block',
  minWidth: '50px',
  px: 1,
  py: 0.5,
  textAlign: 'center',
  borderRadius: 1,
  bgcolor: 'primary.light',
  color: 'white',
  fontWeight: 'bold',
  ml: 1,
});

export const actionButtonContainer = (): SxProps<Theme> => ({
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 4,
  gap: 2,
});
