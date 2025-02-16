export type AppContextType = {
  screen: string;
  setScreen: (screen: string) => void;
  players: { P1: string; P2: string };
  setPlayers: (players: { P1: string; P2: string }) => void;
};
