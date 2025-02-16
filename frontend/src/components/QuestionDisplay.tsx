import { Box, Button } from '@mui/material';
import TriviaQuestion from './TriviaQuestion.tsx';
import Dictation from './Dictation.tsx';

interface QuestionDisplayProps {
  onStartGame: () => void;
  onSwitchPlayers: () => void;
}

const QuestionDisplay = ({ onStartGame, onSwitchPlayers }: QuestionDisplayProps) => {
  const handleStartGame = (): void => onStartGame();

  const handleSwitchPlayer = (): void => onSwitchPlayers();

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
      <TriviaQuestion />
      <Dictation />
      {/* TODO TO BE REMOVED */}
      <Button variant={'contained'} onClick={handleStartGame}>
        Start!
      </Button>
      <Button variant={'contained'} onClick={handleSwitchPlayer}>
        Switch Players!
      </Button>
    </Box>
  );
};

export default QuestionDisplay;
