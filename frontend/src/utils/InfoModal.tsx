import { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import './InfoModal.css';

export const InfoModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant={'contained'}
        style={{ backgroundColor: '#383FC2', color: 'white' }}
        sx={{ borderRadius: '75px', fontSize: '15px', marginBottom: '15px' }}
      >
        How To Play
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-container">
          <Button onClick={handleClose} className="close-button">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default InfoModal;
