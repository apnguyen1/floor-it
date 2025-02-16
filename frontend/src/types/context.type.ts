export type AppContextType = {
  screen: string;
  setScreen: (screen: string) => void;
  players: { P1: string; P2: string };
  setPlayers: (players: { P1: string; P2: string }) => void;
};

export type GameContextType = {
  playerOneActive: boolean;
  setPlayerOneActive: (playerOneActive: boolean) => void;
  playerOneTime: number;
  setPlayerOneTime: (playerOneTime: number) => void;
  playerTwoTime: number;
  setPlayerTwoTime: (playerTwoTime: number) => void;
  inGame: boolean;
  setInGame: (inGame: boolean) => void;
};
