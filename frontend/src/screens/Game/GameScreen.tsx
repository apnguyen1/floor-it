import React from 'react';
import { GameProvider } from '../../context/GameContext.tsx';
import GameManager from '../../components/GameManager.tsx';

export const GameScreen: React.FC = () => {
  return (
    <GameProvider>
      <GameManager />
    </GameProvider>
  );
};
