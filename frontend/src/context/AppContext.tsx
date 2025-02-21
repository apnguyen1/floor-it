import { createContext, ReactNode, useState } from 'react';
import { PlayerState } from '../types/global.type.ts';

type AppContextType = {
  screen: string;
  setScreen: (screen: string) => void;
  players: {
    P1: PlayerState;
    P2: PlayerState;
  };
  setPlayers: (players: { P1: PlayerState; P2: PlayerState }) => void;
  selectedCategory: string[];
  setSelectedCategory: (categoryName: string[]) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState('home');
  const [players, setPlayers] = useState({
    P1: { name: 'P1', color: '#D53E4F' },
    P2: { name: 'P2', color: '#3288BD' },
  });
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        players,
        setPlayers,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
