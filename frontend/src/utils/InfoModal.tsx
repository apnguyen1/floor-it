import { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const InfoModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const url = '/img/help_background.png';

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant={'contained'}
        sx={{
          borderRadius: '75px',
          fontSize: '15px',
          marginBottom: '15px',
          backgroundColor: '#383FC2',
          color: 'white',
        }}
      >
        How To Play
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '1000px',
            height: '500px',
            backgroundColor: '#fff',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
            borderRadius: '15px',
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <Button
            onClick={handleClose}
            sx={{ position: 'absolute', top: '10px', left: '20px' }}
          >
            <CloseIcon
              sx={{
                fontSize: '50px',
                backgroundColor: 'white',
                borderRadius: '15px',
              }}
            />
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default InfoModal;
