import React, { useEffect, useState } from 'react';
import { Player } from './Player.tsx';
import { Box, Button } from '@mui/material';
import { useApp } from '../../hooks/useApp.ts';
import QuestionDisplay from './QuestionDisplay.tsx';
import { CategoryContent } from '../../types/category.type.ts';
import { shuffleArray } from '../../utils/shuffler.ts';
import { fetchCategoryData } from '../../utils/fetch.ts';

export const GameScreen: React.FC = () => {
  const { players, selectedCategory } = useApp();
  const [category, setCategory] = useState<CategoryContent | undefined>(undefined);
  const [inGame, setInGame] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState(true);

  // fetch category data
  useEffect(() => {
    if (!category) {
      const getData = async () => {
        const shuffledName = shuffleArray(selectedCategory)[0]
          .toLowerCase()
          .replace(/\s/g, '_')
          .concat('.json');

        const data = await fetchCategoryData(shuffledName);
        setCategory(data);
      };

      getData();
    }
  }, [selectedCategory]);

  const handleStartGame = () => setInGame(true);

  const handleTimeOut = (playerName: string) => {
    setInGame(false);
    alert(
      `${playerName === players.P1.name ? players.P2.name : players.P1.name}, You've won!`,
    );
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
      <QuestionDisplay />
      <Player
        playerName={players.P2.name}
        inGame={inGame}
        onTimeOut={handleTimeOut}
        isActive={!activePlayer}
      />
      <Button variant={'contained'} onClick={handleStartGame}>
        Start Game
      </Button>
      <Button variant={'contained'} onClick={handleSwitchPlayers} disabled={!inGame}>
        Switch Players
      </Button>
    </Box>
  );
};
