import { useApp } from '../../hooks/useApp.ts';
import './Home.css';
import { ScreenType } from '../../constants/screens.ts';
import { Box, Button, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {
  buttonsContainer,
  homeScreenBox,
  homeScreenPlayButton,
  homeScreenTitle,
} from './HomeScreen.style.ts';
import InfoModal from './Instructions/InfoModal.tsx';

export const HomeScreen = () => {
  const { setScreen } = useApp();

  return (
    <Box sx={homeScreenBox()}>
      <Typography sx={homeScreenTitle()}>Floor It!</Typography>

      <Box sx={buttonsContainer()}>
        <Button
          className="play-button"
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={() => setScreen(ScreenType.Avatar)}
          sx={homeScreenPlayButton()}
        >
          LET'S PLAY
        </Button>
        <InfoModal />
      </Box>
    </Box>
  );
};
