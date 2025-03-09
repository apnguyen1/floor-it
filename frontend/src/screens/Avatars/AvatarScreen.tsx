import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ScreenType } from '../../constants/screens';
import { useApp } from '../../hooks/useApp';
import {
  backButton,
  contentPaper,
  playersContainer,
  readyButton,
  screenContainer,
  screenTitle,
} from './AvatarScreen.style';
import { PlayerSetup } from './components/PlayerSetUp/PlayerSetup.tsx';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

/**
 * AvatarScreen allows users to set up their player profiles before the game
 * Players can choose names and colors for identification during gameplay
 */
export const AvatarScreen: React.FC = () => {
  const { setScreen, updatePlayerOne, updatePlayerTwo, players } = useApp();

  // Initializing player names and colors with values from context
  const [player1Name, setPlayer1Name] = useState(players.P1.name);
  const [player2Name, setPlayer2Name] = useState(players.P2.name);
  const [player1Color, setPlayer1Color] = useState(players.P1.color);
  const [player2Color, setPlayer2Color] = useState(players.P2.color);

  const handlePlayer1NameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1Name(event.target.value);
  };

  const handlePlayer2NameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2Name(event.target.value);
  };

  const handleReadyClick = () => {
    // Set player names and colors in context
    updatePlayerOne({ name: player1Name || 'P1', color: player1Color });
    updatePlayerTwo({ name: player2Name || 'P2', color: player2Color });

    // Navigate to categories screen
    setScreen(ScreenType.Categories);
  };

  const handleBackClick = () => {
    setScreen(ScreenType.Home);
  };

  return (
    <Box sx={screenContainer()}>
      <Container maxWidth="md">
        <Paper sx={contentPaper()} elevation={3}>
          {/* Back button */}
          <IconButton onClick={handleBackClick} sx={backButton()}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h1" sx={screenTitle()}>
            V.S.
          </Typography>

          {/* Player Setup Form */}
          <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={playersContainer()}
            >
              {/* Player 1 Setup */}
              <PlayerSetup
                playerName={player1Name}
                playerColor={player1Color}
                defaultPlayerName="P1"
                onNameChange={handlePlayer1NameChange}
                onColorChange={setPlayer1Color}
                otherPlayerColor={player2Color}
              />

              {/* Player 2 Setup */}
              <PlayerSetup
                playerName={player2Name}
                playerColor={player2Color}
                defaultPlayerName="P2"
                onNameChange={handlePlayer2NameChange}
                onColorChange={setPlayer2Color}
                otherPlayerColor={player1Color}
              />
            </Stack>

            {/* Ready Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleReadyClick}
              sx={readyButton()}
              startIcon={<PlayArrowIcon />}
            >
              Ready!
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AvatarScreen;
