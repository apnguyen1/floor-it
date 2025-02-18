import React, { useCallback, useEffect, useState } from 'react';
import { Player } from './Player.tsx';
import { Box, Button } from '@mui/material';
import { useApp } from '../../hooks/useApp.ts';
import { CategoryContent } from '../../types/category.type.ts';
import { shuffleArray } from '../../utils/shuffler.ts';
import { fetchCategoryData } from '../../utils/fetch.ts';
import { QuestionDisplay } from './QuestionDisplay.tsx';
import { ScreenType } from '../../constants/screens.ts';

export const GameScreen: React.FC = () => {
  const { players, selectedCategory, setScreen } = useApp();
  const [inGame, setInGame] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState(true);
  const [category, setCategory] = useState<CategoryContent | undefined>(undefined);

  /**
   * Fetch CategoryData
   */
  useEffect(() => {
    if (!category) {
      const randomCategory = shuffleArray(selectedCategory)[0]
        .toLowerCase()
        .replace(/\s/g, '_')
        .concat('.json');
      fetchCategoryData(randomCategory).then((d) => setCategory(d));
    }
  }, [category, selectedCategory]);

  /**
   * Starts game
   */
  const handleStartGame = () => setInGame(true);

  /**
   * Determines the winner of the game
   *
   * @param playerName
   */
  const handleTimeOut = (playerName: string) => {
    setInGame(false);
    alert(
      `${playerName === players.P1.name ? players.P2.name : players.P1.name}, You've won!`,
    );
  };

  /**
   * Switches the player's turn
   */
  const handleSwitchPlayers = useCallback(() => {
    setActivePlayer((prev) => !prev);
  }, []);

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
      {/*TODO */}
      <Button variant={'text'} onClick={() => setScreen(ScreenType.Categories)}>
        Back
      </Button>
      <Player
        playerName={players.P1.name}
        inGame={inGame}
        onTimeOut={handleTimeOut}
        isActive={activePlayer}
      />
      <QuestionDisplay
        category={category}
        inGame={inGame}
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
