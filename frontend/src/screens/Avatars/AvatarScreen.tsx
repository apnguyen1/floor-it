import { useState } from 'react';
import { useApp } from '../../hooks/useApp.ts';
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ScreenType } from '../../constants/screens.ts';
import { Palette } from '@mui/icons-material'; // Icon for Color Picker

// First, let's move the color options to be reusable
const COLOR_OPTIONS = [
  '#9E0142',
  '#D53E4F', // P1's default color
  '#F46D43',
  '#FDAE61',
  '#FEE08B',
  '#E6F598',
  '#ABDDA4',
  '#66C2A5',
  '#3288BD', // P2's default color
  '#5E4FA2',
] as const;

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
    <Box>
      <Tooltip title="Select Color">
        <IconButton onClick={handleClick}>
          <Palette sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* Box layout for Color Squares */}
        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={1} padding={1}>
          {COLOR_OPTIONS.map((color) => {
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
    </Box>
  );
};

export const AvatarScreen = () => {
  const { setScreen, setPlayers, players } = useApp();

  // Initializing player names and colours; assuming default values to be P1 and P2
  const [player1Name, setPlayer1Name] = useState(
    players.P1.name === 'P1' ? '' : players.P1.name,
  );
  const [player2Name, setPlayer2Name] = useState(
    players.P2.name === 'P2' ? '' : players.P2.name,
  );

  const [player1Color, setPlayer1Color] = useState(players.P1.color);
  const [player2Color, setPlayer2Color] = useState(players.P2.color);

  // Get display letters for avatars
  const getAvatarLetter = (name: string, defaultValue: string) => {
    return name.trim() ? name.trim()[0].toUpperCase() : defaultValue;
  };

  const handlePlayer1NameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1Name(event.target.value);
  };

  const handlePlayer2NameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2Name(event.target.value);
  };

  const handleReadyClick = () => {
    // Set player names in context, using defaults if empty
    setPlayers({
      P1: { name: player1Name.trim() || 'Player 1', color: player1Color },
      P2: { name: player2Name.trim() || 'Player 2', color: player2Color },
    });

    // Navigate to categories screen
    setScreen(ScreenType.Categories);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        backgroundImage: 'url(/app_background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        {/* White box container */}
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: 4,
            position: 'relative',
          }}
        >
          {/* Back button */}
          <IconButton
            onClick={() => setScreen(ScreenType.Home)}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              color: 'primary.main',
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h1" textAlign="center" gutterBottom sx={{ mb: 4 }}>
            V.S.
          </Typography>

          {/* Player Setup Form */}
          <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              {/* Player 1 */}
              <Box
                className="player-box"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  padding: 3,
                  borderRadius: 2,
                  backgroundColor: player1Color,
                  width: 250, // Fixed width for consistency
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: 'white',
                    color: player1Color,
                    border: `2px solid ${player1Color}`,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {getAvatarLetter(player1Name, 'P1')}
                </Avatar>
                <TextField
                  placeholder="Player 1"
                  variant="outlined"
                  value={player1Name}
                  onChange={handlePlayer1NameChange}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
                <ColorPicker
                  selectedColor={player1Color}
                  setSelectedColor={setPlayer1Color}
                  allSelectedColors={[player2Color]}
                />
              </Box>

              {/* Player 2 */}
              <Box
                className="player-box"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  padding: 3,
                  borderRadius: 2,
                  backgroundColor: player2Color,
                  width: 250,
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: 'white',
                    color: player2Color,
                    border: `2px solid ${player2Color}`,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {getAvatarLetter(player2Name, 'P2')}
                </Avatar>
                <TextField
                  placeholder="Player 2"
                  variant="outlined"
                  value={player2Name}
                  onChange={handlePlayer2NameChange}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
                <ColorPicker
                  selectedColor={player2Color}
                  setSelectedColor={setPlayer2Color}
                  allSelectedColors={[player1Color]}
                />
              </Box>
            </Stack>

            {/* Centered Ready Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleReadyClick}
              sx={{
                minWidth: 200,
                mt: 2,
              }}
            >
              Ready!
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
