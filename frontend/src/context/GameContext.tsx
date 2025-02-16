import { createContext, ReactNode, useState } from 'react';
import { GameContextType } from '../types/context.type.ts';

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerOneActive, setPlayerOneActive] = useState(true);
  const [playerOneTime, setPlayerOneTime] = useState(0);
  const [playerTwoTime, setPlayerTwoTime] = useState(0);
  const [inGame, setInGame] = useState(false);

  return (
    <GameContext.Provider
      value={{
        playerOneActive,
        setPlayerOneActive,
        playerOneTime,
        setPlayerOneTime,
        playerTwoTime,
        setPlayerTwoTime,
        inGame,
        setInGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
