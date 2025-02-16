import { Box, Button } from '@mui/material';
import { Player } from './Player.tsx';
import QuestionDisplay from './QuestionDisplay.tsx';
import { useGame } from '../hooks/useGame.ts';

const GameManager = () => {
  const { playerOneActive } = useGame();

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
        backgroundColor: 'rgb(255, 255, 255, 1)',
        borderRadius: 100,
      }}
    >
      <Player
        playerName={'P1'}
        initialTime={initialTime}
        isActive={playerOneActive}
        inGame={inGame}
      />
      <QuestionDisplay />
      <Player
        playerName={'P2'}
        initialTime={initialTime}
        isActive={!playerOneActive}
        inGame={inGame}
      />
      {/*TODO to be removed after Ticket-84*/}
      <Button onClick={handleGameState}>Play</Button>
      <Button onClick={handleSwitchPlayers}>Switch</Button>
    </Box>
  );
};

export default GameManager;
