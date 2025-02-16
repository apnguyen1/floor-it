import { createContext, ReactNode, useState } from 'react';
import { GameContextType } from '../types/context.type.ts';

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [inGame, setInGame] = useState(false);

  return (
    <GameContext.Provider
      value={{
        inGame,
        setInGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
