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
