import { createContext, ReactNode, useState } from 'react';
import { AppContextType } from '../types/context.type.ts';

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
