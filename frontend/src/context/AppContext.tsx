import { createContext, ReactNode, useState } from 'react';

type AppContextType = {
  screen: string;
  setScreen: (screen: string) => void;
  players: { P1: string; P2: string };
  setPlayers: (players: { P1: string; P2: string }) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState('home');
  const [players, setPlayers] = useState({ P1: '', P2: '' });

  return (
    <AppContext.Provider value={{ screen, setScreen, players, setPlayers }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
