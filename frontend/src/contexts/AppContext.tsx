import { createContext, ReactNode, useCallback, useState } from 'react';
import { PlayerState } from '../types/global.type.ts';

export type AppContextType = {
  screen: string;
  setScreen: (screen: string) => void;
  players: {
    P1: PlayerState;
    P2: PlayerState;
  };
  setPlayers: (players: { P1: PlayerState; P2: PlayerState }) => void;
  updatePlayerOne: (update: Partial<PlayerState>) => void;
  updatePlayerTwo: (update: Partial<PlayerState>) => void;
  updateBothPlayers: (updates: Partial<PlayerState>) => void;
  useSharedTimer: boolean;
  setUseSharedTimer: (useShared: boolean) => void;
  selectedCategory: string[];
  setSelectedCategory: (categoryName: string[]) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);
const DEFAULT_TIMER_SECONDS = 30;

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState('home');
  const [useSharedTimer, setUseSharedTimer] = useState(true);
  const [players, setPlayers] = useState({
    P1: { name: 'P1', color: '#D53E4F', time: DEFAULT_TIMER_SECONDS },
    P2: { name: 'P2', color: '#3288BD', time: DEFAULT_TIMER_SECONDS },
  });
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const updatePlayerOne = useCallback((updates: Partial<PlayerState>) => {
    setPlayers((prev) => ({
      ...prev,
      P1: { ...prev.P1, ...updates },
    }));
  }, []);

  const updatePlayerTwo = useCallback((updates: Partial<PlayerState>) => {
    setPlayers((prev) => ({
      ...prev,
      P2: { ...prev.P2, ...updates },
    }));
  }, []);

  const updateBothPlayers = useCallback((updates: Partial<PlayerState>) => {
    setPlayers((prev) => ({
      P1: { ...prev.P1, ...updates },
      P2: { ...prev.P2, ...updates },
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        players,
        setPlayers,
        updatePlayerOne,
        updatePlayerTwo,
        updateBothPlayers,
        useSharedTimer,
        setUseSharedTimer,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
