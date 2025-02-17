import { CategoryContent } from './category.type.ts';

export type PlayerState = {
  name: string;
};

export type AppContextType = {
  screen: string;
  setScreen: (screen: string) => void;
  players: {
    P1: PlayerState;
    P2: PlayerState;
  };
  setPlayers: (players: { P1: PlayerState; P2: PlayerState }) => void;
  selectedCategory: CategoryContent | undefined;
  setSelectedCategory: (selectedCategory: CategoryContent | undefined) => void;
};
