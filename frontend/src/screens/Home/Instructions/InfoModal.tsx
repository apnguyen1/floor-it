import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import TimerIcon from '@mui/icons-material/Timer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuizIcon from '@mui/icons-material/Quiz';
import {
  closeButton,
  closeIcon,
  infoButton,
  instructionBox,
  keyPoint,
  keyPointIcon,
  keyPointText,
  modalBox,
  modalTitle,
  sectionTitle,
} from './InfoModal.style';

export const InfoModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<HelpOutlineIcon />}
        sx={infoButton()}
      >
        How To Play
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalBox()}>
          <Button onClick={handleClose} sx={closeButton()}>
            <CloseIcon sx={closeIcon()} />
          </Button>

          <Typography variant="h4" component="h2" sx={modalTitle()}>
            How To Play Floor It!
          </Typography>

          <Typography variant="body1" paragraph>
            Floor It! is a fast-paced trivia game where two players compete to see who
            has the quickest knowledge and speech. Answer questions using your voice
            before time runs out!
          </Typography>

          <Box sx={instructionBox()}>
            <Box sx={keyPoint()}>
              <GroupIcon sx={keyPointIcon()} />
              <Typography sx={keyPointText()}>
                <strong>Two Players:</strong> The game is designed for two players to
                compete head-to-head.
              </Typography>
            </Box>

            <Box sx={keyPoint()}>
              <CategoryIcon sx={keyPointIcon()} />
              <Typography sx={keyPointText()}>
                <strong>Choose Categories:</strong> Select up to 10 trivia categories
                that interest you and your opponent.
              </Typography>
            </Box>

            <Box sx={keyPoint()}>
              <MicIcon sx={keyPointIcon()} />
              <Typography sx={keyPointText()}>
                <strong>Voice Answers:</strong> Use your microphone to speak the answers
                out loud. The game will recognize when you've said the correct answer!
              </Typography>
            </Box>

            <Box sx={keyPoint()}>
              <TimerIcon sx={keyPointIcon()} />
              <Typography sx={keyPointText()}>
                <strong>Beat the Clock:</strong> Each player has a timer. If time runs
                out during your turn, your opponent wins!
              </Typography>
            </Box>

            <Box sx={keyPoint()}>
              <SpaceBarIcon sx={keyPointIcon()} />
              <Typography sx={keyPointText()}>
                <strong>Skip Questions:</strong> Press the Spacebar or say "Next" to
                skip a difficult question.
              </Typography>
            </Box>

            <Box sx={keyPoint()}>
              <EmojiEventsIcon sx={keyPointIcon()} />
              <Typography sx={keyPointText()}>
                <strong>Win by Survival:</strong> The last player with time remaining
                wins the game!
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" sx={sectionTitle()}>
            Game Flow
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <QuizIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Setup"
                secondary="First, create your player profiles and select your avatar colors."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <QuizIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Select Categories"
                secondary="Browse and select the trivia categories you want to play with."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <QuizIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Start Game"
                secondary="The first player will be randomly selected. Answer correctly to keep your turn going."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <QuizIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Take Turns"
                secondary="After a correct answer, the turn passes to the other player. Keep answering until someone runs out of time!"
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Make sure your microphone is enabled and speak clearly for best results!
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            fullWidth
            sx={{
              mt: 2,
              borderRadius: '75px',
              fontWeight: 'bold',
              py: 1,
            }}
          >
            Got It!
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default InfoModal;
