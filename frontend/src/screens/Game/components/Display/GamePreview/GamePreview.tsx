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
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';

/**
 * Props for GamePreview components
 */
interface GamePreviewProps {
  /** the selected category content, including type and metadata */
  category: CategoryContent;
  /** function to trigger the start of the game */
  onStartGame: () => void;
  /** function to skip to the next category */
  onSkipCategory?: () => void;
  /** whether there's a next category available to skip to */
  hasNextCategory?: boolean;
  /** the name of the next category (for tooltip) */
  nextCategoryName?: string;
}

/**
 * Screen to confirm category selection
 *
 * @param {GamePreviewProps} props - Component props
 */
export const GamePreview = ({
  category,
  onStartGame,
  onSkipCategory,
  hasNextCategory,
  nextCategoryName,
}: GamePreviewProps) => {
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

      <Box sx={buttonContainer()}>
        <Tooltip title={'Start Game!'}>
          <IconButton
            color="primary"
            onClick={onStartGame}
            sx={previewButton()}
            aria-label="Play Game!"
          >
            <PlayCircleIcon />
          </IconButton>
        </Tooltip>

        {hasNextCategory && onSkipCategory && (
          <Tooltip
            title={
              nextCategoryName ? `Skip to ${nextCategoryName}` : 'Skip to Next Category'
            }
            arrow
          >
            <IconButton
              color="secondary"
              onClick={onSkipCategory}
              sx={previewButton()}
              aria-label="Skip to next category"
            >
              <SkipNextIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};
