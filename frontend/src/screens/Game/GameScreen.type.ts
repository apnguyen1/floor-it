// Manages the current game status:
// - `inGame`: Indicates whether the game is in progress.
// - `activePlayer`: Determines whose turn it is (true = Player 1, false = Player 2).
// - `winner`: Stores the name of the winning player or `undefined` if the game is
// ongoing.
export type GameStatus = {
  inGame: boolean;
  activePlayer: boolean;
  winner: string | undefined;
};
