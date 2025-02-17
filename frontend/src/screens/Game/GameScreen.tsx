import React, { useState } from 'react';
import { Player } from '../../components/Player.tsx';
import { Box } from '@mui/material';
import { useApp } from '../../hooks/useApp.ts';
import QuestionDisplay from '../../components/QuestionDisplay.tsx';

export const GameScreen: React.FC = () => {
  const { players } = useApp();
  const [inGame, setInGame] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState(true);

  const handleStartGame = () => setInGame((prev) => !prev);

  const handleTimeOut = (playerName: string) => {
    setInGame(false);
    if (playerName === players.P1.name) {
      alert(`${players.P2.name}, You've won!`);
    } else {
      alert(`${players.P1.name}, You've won!`);
    }
  };

  const handleSwitchPlayers = () => setActivePlayer((prev) => !prev);

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
        borderRadius: 150,
        backgroundColor: 'rgba(200,255,239,0.90)',
      }}
    >
      <Player
        playerName={players.P1.name}
        inGame={inGame}
        onTimeOut={handleTimeOut}
        isActive={activePlayer}
      />
      <QuestionDisplay
        onStartGame={handleStartGame}
        onSwitchPlayers={handleSwitchPlayers}
      />
      <Player
        playerName={players.P2.name}
        inGame={inGame}
        onTimeOut={handleTimeOut}
        isActive={!activePlayer}
      />
    </Box>
  );
};
