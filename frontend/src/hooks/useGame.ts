import { useContext } from 'react';
import { GameContext } from '../context/GameContext.tsx';

export const useGame = () => {
  const context =
    
    
    
    useContext(GameContext);
  if
  
  (!context) throw new Error('useGame must be used to use');

  return context;
};
