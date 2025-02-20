import { Avatar, Box, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Timer from './Timer/Timer.tsx';

interface PlayerProps {
  playerName: string;
  inGame: boolean;
  onTimeOut: (playerName: string) => void;
  isActive: boolean;
  winner: string | undefined;
  listening: boolean;
}

export const Player = ({
  playerName,
  inGame,
  onTimeOut,
  isActive,
  winner,
  listening,
}: PlayerProps) => {
  const firstName: string = playerName.split(' ')[0];
  const abbrev: string = firstName.length > 2 ? firstName.substring(0, 2) : firstName;

  const getPlayerStatus = () => {
    if (winner) {
      return (
        <Typography
          variant="h6"
          color={winner === playerName ? 'success.main' : 'error.main'}
        >
          {winner === playerName ? 'Winner!' : "Time's up!"}
        </Typography>
      );
    }

    if (isActive) {
      return (
        <>
          <Typography variant="h6" color={isActive ? 'primary' : 'textDisabled'}>
            {firstName}'s Turn
          </Typography>
          {listening ? (
            <MicIcon color={'success'} fontSize={'large'} />
          ) : (
            <MicOffIcon color={'error'} fontSize={'large'} />
          )}
        </>
      );
    }

    if (!inGame && isActive) {
      return (
        <Typography variant="h6" color="info">
          <strong>
            <u>You will start!</u>
          </strong>
        </Typography>
      );
    }

    return null;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
        minHeight: '495px',
        padding: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '10px',
      }}
    >
      <Avatar
        sx={{
          bgcolor: isActive ? 'primary.main' : 'grey.400',
          transition: 'background-color 0.3s ease',
        }}
      >
        {abbrev}
      </Avatar>
      <Timer
        inGame={inGame}
        onTimeOut={onTimeOut}
        isActive={isActive}
        playerName={playerName}
      />
      {getPlayerStatus()}
    </Box>
  );
};
