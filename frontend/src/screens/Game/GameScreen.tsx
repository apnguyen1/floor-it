import React, { useEffect, useState } from 'react';
import { Player } from '../../components/Player.tsx';
import { Box } from '@mui/material';
import { useApp } from '../../hooks/useApp.ts';
import QuestionDisplay from './QuestionDisplay.tsx';
import { CategoryContent } from '../../types/category.type.ts';
import { shuffleArray } from '../../utils/shuffler.ts';
import { fetchCategoryData } from '../../utils/fetch.ts';

export const GameScreen: React.FC = () => {
  const { players, selectedCategory } = useApp();
  const [category, setCategory] = useState<CategoryContent | undefined>(undefined);

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
      <Player playerName={players.P1.name} />
      <QuestionDisplay category={category} />
      <Player playerName={'P2'} />
    </Box>
  );
};
