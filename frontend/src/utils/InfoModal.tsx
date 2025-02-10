import { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import './InfoModal.css';

export const InfoModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant={'contained'}>
        Open Instructions
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-container">
          <Typography id="modal-title" variant="h6" component="h2">
            Floor It Instructions
          </Typography>
          <Typography id="modal-description" className="modal-description">
            Your instructions content goes here...
          </Typography>
          <Button onClick={handleClose} className="close-button">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default InfoModal;
