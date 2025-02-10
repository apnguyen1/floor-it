import { Avatar, Box } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export const Player = () => {
  return (
    <Box
      className="player-frame-box"
      sx={{
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75%',
        width: '100%',
      }}
    >
      <Box
        className="player-box"
        sx={{
          border: '15px solid BLUE',
          borderRadius: '15px',
          padding: '15px',
          backgroundColor: '#CDEDF9',
          alignItems: 'center',
          width: '100%',
          height: 'inherit',
        }}
      >
        <Box
          className="player-content-box"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '50%',
            alignItems: 'center',

            justifyContent: 'space-around',
            gap: 1,
          }}
        >
          <Box className="player-avatar-box">
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: 64,
                height: 64,
                fontSize: 24,
              }}
            >
              AN
            </Avatar>
          </Box>
          <Box
            className="player-timer-box"
            sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            0:45
          </Box>
          <Box
            className="player-turn-box"
            sx={{ fontSize: '1rem', fontWeight: 'bold' }}
          >
            P1's Turn
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
