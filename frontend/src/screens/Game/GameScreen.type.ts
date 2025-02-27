// Manages the current game status:
// - `inGame`: Indicates whether the game is in progress.
// - `activePlayer`: Determines whose turn it is (true = Player 1, false = Player 2).
// - `winner`: Stores the name of the winning player or `undefined` if the game is
// ongoing.
export type GameStatus = {
  inGame: boolean;
  activePlayer: boolean;
  winner?: string;
};

/**
 * Holds the questions of a category
 *  - `question`: the question or image being displayed
 *  - `answers`: a list of acceptable correct answers
 *  - `answers`: a list of acceptable similar answers
 */
export type Question = {
  question: string;
  answers: string[];
  aliases: string[];
};

/**
 * the metadata of a category
 *  - `name`: the name of the category
 *  - `preview_img`: the image of the category
 *  - `preview_desc`: the description of the category
 *  - `type`: the type of category, whether its images or text
 *  - `questions` the {Question}s of the category
 */
export type CategoryContent = {
  name: string;
  preview_img: string;
  preview_desc: string;
  type: 'text' | 'img';
  questions: Question[];
  fuzzy_matching_threshold?: number;
};
