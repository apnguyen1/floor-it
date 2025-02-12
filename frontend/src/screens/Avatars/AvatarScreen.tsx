import { useState } from 'react';
import { useGame } from '../../hooks/useGame.ts';
import {
  Button,
  Container,
  Avatar,
  TextField,
  IconButton,
  Box,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ScreenType } from '../../constants/screens.ts';
import { Palette } from '@mui/icons-material'; // Icon for Color Picker

// Custom Color Picker Component
const ColorPicker = ({
  selectedColor,
  setSelectedColor,
  allSelectedColors,
}: {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  allSelectedColors: string[];
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const colorOptions = [
    '#9E0142',
    '#D53E4F',
    '#F46D43',
    '#FDAE61',
    '#FEE08B',
    '#E6F598',
    '#ABDDA4',
    '#66C2A5',
    '#3288BD',
    '#5E4FA2',
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Select Color">
        <IconButton onClick={handleClick}>
          <Palette />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* Box layout for Color Squares */}
        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={1} padding={1}>
          {colorOptions.map((color) => {
            const isDisabled = allSelectedColors.includes(color); // Check if the color is selected by another player
            return (
              <MenuItem
                key={color}
                onClick={() => !isDisabled && handleColorSelect(color)} // Disable click if color is disabled
                style={{
                  backgroundColor: color,
                  width: '30px',
                  height: '30px',
                  borderRadius: '4px',
                  margin: 'auto',
                  display: 'block',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  textAlign: 'center',
                  color: '#fff',
                  textDecoration: isDisabled ? 'line-through' : 'none', // Apply strikethrough if disabled
                }}
              >
                {color === selectedColor && '✓'}
              </MenuItem>
            );
          })}
        </Box>
      </Menu>
    </div>
  );
};

export const AvatarScreen = () => {
  const { setScreen } = useGame();

  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Color, setPlayer1Color] = useState<string>('red');
  const [player2Color, setPlayer2Color] = useState<string>('blue');

  const handlePlayer1NameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1Name(event.target.value);
  };

  const handlePlayer2NameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2Name(event.target.value);
  };

  const handleReadyClick = () => {
    setScreen(ScreenType.Categories);
  };

  return (
    <Container className="avatar-screen">
      <IconButton className="back-button" onClick={() => setScreen(ScreenType.Home)}>
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
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          {/* Player 1 */}
          <Box className="player-box" style={{ backgroundColor: player1Color }}>
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
              placeholder="Player 1"
              variant="outlined"
              value={player1Name}
              onChange={handlePlayer1NameChange}
              fullWidth
            />
            {/* Custom Color Picker for Player 1 */}
            <ColorPicker
              selectedColor={player1Color}
              setSelectedColor={setPlayer1Color}
              allSelectedColors={[player2Color]} // Pass Player 2's color to avoid conflict
            />
          </Box>

          {/* Player 2 */}
          <Box className="player-box" style={{ backgroundColor: player2Color }}>
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
              placeholder="Player 2"
              variant="outlined"
              value={player2Name}
              onChange={handlePlayer2NameChange}
              fullWidth
            />
            {/* Custom Color Picker for Player 2 */}
            <ColorPicker
              selectedColor={player2Color}
              setSelectedColor={setPlayer2Color}
              allSelectedColors={[player1Color]} // Pass Player 1's color to avoid conflict
            />
          </Box>
        </Stack>
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
