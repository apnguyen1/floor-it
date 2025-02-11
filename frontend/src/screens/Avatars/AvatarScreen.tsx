// import { useGame } from '../../hooks/useGame.ts';
// import { Button, Container, Typography } from '@mui/material';
// import { ScreenType } from '../../constants/screens.ts';

// export const AvatarScreen = () => {
//   const { setScreen } = useGame();

//   return (
//     <Container>
//       <Typography variant={'h1'}>Avatar Screen</Typography>
//       <Button
//         variant={'contained'}
//         color="primary"
//         size="large"
//         onClick={() => setScreen(ScreenType.Categories)}
//       >
//         Confirm
//       </Button>
//     </Container>
//   );
// };

import { useState } from 'react';
import { useGame } from '../../hooks/useGame.ts';
import {
  Button,
  Container,
  Grid,
  Avatar,
  TextField,
  IconButton,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ScreenType } from '../../constants/screens.ts';

const colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'brown',
  'grey',
  'cyan',
];

export const AvatarScreen = () => {
  const { setScreen } = useGame();

  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player1Color, setPlayer1Color] = useState<string>('red');
  const [player2Color, setPlayer2Color] = useState<string>('blue');

  const handlePlayer1NameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1Name(event.target.value);
  };

  const handlePlayer2NameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2Name(event.target.value);
  };

  const handlePlayer1ColorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlayer1Color(event.target.value as string);
  };

  const handlePlayer2ColorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlayer2Color(event.target.value as string);
  };

  const handleReadyClick = () => {
    // Navigate to the game screen
    setScreen(ScreenType.Categories);
  };

  return (
    <Container>
      <IconButton
        style={{ position: 'absolute', top: 20, left: 20 }}
        onClick={() => setScreen(ScreenType.Home)}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography variant={'h1'} textAlign="center" gutterBottom>
        V.S.
      </Typography>

      {/* Player Setup Form */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Player 1 */}
          <Grid item xs={5} style={{ padding: 20, backgroundColor: player1Color }}>
            <Avatar
              alt="Player 1"
              sx={{
                width: 56,
                height: 56,
                backgroundColor: player1Color,
                marginBottom: 2,
              }}
            />
            <TextField
              label="Player 1 Name"
              variant="outlined"
              value={player1Name}
              onChange={handlePlayer1NameChange}
              fullWidth
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Choose Color</InputLabel>
              <Select
                value={player1Color}
                onChange={handlePlayer1ColorChange}
                label="Choose Color"
              >
                {colors.map(
                  (color) =>
                    player2Color !== color && (
                      <MenuItem key={color} value={color}>
                        {color}
                      </MenuItem>
                    ),
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Player 2 */}
          <Grid item xs={5} style={{ padding: 20, backgroundColor: player2Color }}>
            <Avatar
              alt="Player 2"
              sx={{
                width: 56,
                height: 56,
                backgroundColor: player2Color,
                marginBottom: 2,
              }}
            />
            <TextField
              label="Player 2 Name"
              variant="outlined"
              value={player2Name}
              onChange={handlePlayer2NameChange}
              fullWidth
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Choose Color</InputLabel>
              <Select
                value={player2Color}
                onChange={handlePlayer2ColorChange}
                label="Choose Color"
              >
                {colors.map(
                  (color) =>
                    player1Color !== color && (
                      <MenuItem key={color} value={color}>
                        {color}
                      </MenuItem>
                    ),
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Ready Button */}
      <Button
        variant={'contained'}
        color="primary"
        size="large"
        onClick={handleReadyClick}
        style={{ marginTop: 20 }}
      >
        Ready!
      </Button>
    </Container>
  );
};
