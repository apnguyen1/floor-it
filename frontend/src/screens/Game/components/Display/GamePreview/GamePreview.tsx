import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { CategoryContent } from '../../../GameScreen.type.ts';
import {
  buttonContainer,
  categoryDescription,
  categoryTitle,
  gamePreview,
  previewButton,
  previewImage,
} from './GamePreview.style.ts';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

/**
 * Props for GamePreview components
 */
interface GamePreviewProps {
  /** the selected category content, including type and metadata */
  category: CategoryContent;
  /** Category progress information */
  categoryProgress?: { current: number; total: number };
  /** function to trigger the start of the game */
  onStartGame: () => void;
  /** function to skip to the next category */
  onSkipCategory?: () => void;
}

/**
 * Screen to confirm category selection
 *
 * @param {GamePreviewProps} props - Component props
 */
export const GamePreview = ({
  category,
  categoryProgress,
  onStartGame,
  onSkipCategory,
}: GamePreviewProps) => {
  const imgUrl = `previews/${category.preview_img}`;

  const isLastCategory =
    categoryProgress && categoryProgress.current === categoryProgress.total;

  return (
    <Box className="game-preview" sx={gamePreview()}>
      <Typography variant="h2" sx={categoryTitle()}>
        {category.name}
      </Typography>
      <Box component="img" src={imgUrl} alt="Category Preview" sx={previewImage()} />
      <Typography variant="h5" color="secondary" sx={categoryDescription()}>
        {category.preview_desc}
      </Typography>

      <Box sx={buttonContainer()}>
        {!isLastCategory && onSkipCategory && (
          <Tooltip title={'Skip to Next Category'} arrow>
            <IconButton
              color="secondary"
              onClick={onSkipCategory}
              sx={previewButton()}
              aria-label="Skip to next category"
            >
              <SkipNextIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={'Start Game!'} arrow>
          <IconButton
            color="success"
            onClick={onStartGame}
            sx={previewButton()}
            aria-label="Play Game!"
          >
            <PlayArrowIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
