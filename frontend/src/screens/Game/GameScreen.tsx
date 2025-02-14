import { Box } from '@mui/material';
import { Player } from '../../components/Player.tsx';

export const GameScreen = () => {
  return (
    <Box
      className="game-box"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: 2,
      }}
    >
      {/* Left Player Box */}
      <Player></Player>

      {/* Question Box - Centered */}
      <Box
        className="question-box"
        sx={{
          flex: 2,
          textAlign: 'center',
          padding: '16px',
          border: '15px solid black',
          borderRadius: '8px',
          minHeight: '100px',
        }}
      >
        NOTHING GOES HERE
      </Box>

      {/* Right Player Box */}
      <Player></Player>
    </Box>
  );
};
