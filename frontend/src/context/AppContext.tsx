import { createContext, ReactNode, useState } from 'react';
import { AppContextType } from '../types/context.type.ts';
import { CategoryContent } from '../types/category.type.ts';

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState('home');
  const [players, setPlayers] = useState({ P1: { name: 'P1' }, P2: { name: 'P2' } });
  const [selectedCategory, setSelectedCategory] = useState<CategoryContent | undefined>(
    undefined,
  );

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
