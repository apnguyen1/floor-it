import { Box } from '@mui/material';
import TriviaQuestion from './TriviaQuestion.tsx';
import Dictation from './Dictation.tsx';
import { CategoryContent } from '../../types/category.type.ts';
import { ReadyToPlay } from './ReadyToPlay.tsx';

interface QuestionDisplay {
  category: CategoryContent | undefined;
  inGame: boolean;
  onStartGame: () => void;
}

/**
 * Displays the category question
 *
 * @param category the chosen category to play
 * @param inGame determines whether the game has started
 * @param onStartGame begins game
 */
export const QuestionDisplay = ({ category, inGame, onStartGame }: QuestionDisplay) => {
  return (
    <Box
      className="question-box"
      sx={{
        flex: 2,
        textAlign: 'center',
        padding: '16px',
        border: '15px solid black',
        borderRadius: '8px',
        minHeight: '100px',
      }}
    >
      {!inGame ? (
        <ReadyToPlay category={category} onStartGame={onStartGame} />
      ) : (
        <>
          <TriviaQuestion category={category} />
          <Dictation />
        </>
      )}
    </Box>
  );
};
