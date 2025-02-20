import { CategoryContent } from '../../../../types/category.type.ts';
import { Button, Typography } from '@mui/material';

interface ReadyToPlayProps {
  category: CategoryContent;
  onStartGame: () => void;
}

/**
 * Screen to confirm category selection
 *
 * @param category the chosen category
 * @param onStartGame to begin the game
 */
export const ReadyToPlay = ({ category, onStartGame }: ReadyToPlayProps) => {
  const imgUrl = `previews/${category.preview_img}`;

  return (
    <>
      <Typography variant="h2" color="primary">
        {category.name}
      </Typography>
      <img
        src={imgUrl}
        alt="Category Preview"
        style={{
          width: '80%',
          maxHeight: '300px',
          borderRadius: '8px',
          margin: '10px 0',
        }}
      />
      <Typography variant="h5" color="secondary">
        {category.preview_desc}
      </Typography>
      <Button variant="contained" color="success" onClick={onStartGame}>
        Start Game
      </Button>
    </>
  );
};
