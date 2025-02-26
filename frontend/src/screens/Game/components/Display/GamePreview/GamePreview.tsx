import { Box, Button, Typography } from '@mui/material';
import { CategoryContent } from '../../../GameScreen.type.ts';
import {
  categoryDescription,
  categoryTitle,
  gamePreview,
  previewImage,
  startButton,
} from './GamePreview.style.ts';

/**
 * Props for GamePreview components
 */
interface GamePreviewProps {
  /** the selected category content, including type and metadata */
  category: CategoryContent;
  /** function to trigger the start of the game */
  onStartGame: () => void;
}

/**
 * Screen to confirm category selection
 *
 * @param {GamePreviewProps} props - Component props
 */
export const GamePreview = ({ category, onStartGame }: GamePreviewProps) => {
  const imgUrl = `previews/${category.preview_img}`;

  return (
    <Box className="game-preview" sx={gamePreview()}>
      <Typography variant="h2" sx={categoryTitle()}>
        {category.name}
      </Typography>
      <Box component="img" src={imgUrl} alt="Category Preview" sx={previewImage()} />
      <Typography variant="h5" color="secondary" sx={categoryDescription()}>
        {category.preview_desc}
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={onStartGame}
        sx={startButton()}
      >
        Start Game
      </Button>
    </Box>
  );
};
