import { Box, Button, Chip } from '@mui/material';
import { MAX_CATEGORIES } from '../../../../constants/screens';
import { CategoryPreview } from '../../../../types/category.type';
import {
  categoryCounter,
  readyButton,
  selectedCategoriesContainer,
  selectionBarContainer,
} from './SelectionBar.style';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { SelectedCategoryChip } from './SelectedChip/SelectedCategoryChip.tsx';

interface SelectionBarProps {
  selectedCategories: CategoryPreview[];
  onToggleCategories: (category: CategoryPreview) => void;
  onGameStart: () => void;
}

export const SelectionBar = ({
  selectedCategories,
  onToggleCategories,
  onGameStart,
}: SelectionBarProps) => {
  const isMaxSelected = selectedCategories.length === MAX_CATEGORIES;

  return (
    <Box sx={selectionBarContainer()}>
      <Chip
        label={`${selectedCategories.length}/${MAX_CATEGORIES} Categories`}
        sx={categoryCounter(isMaxSelected)}
        variant="filled"
      />

      <Box sx={selectedCategoriesContainer()}>
        {selectedCategories.map((category) => (
          <SelectedCategoryChip
            key={category.name}
            category={category}
            onRemove={() => onToggleCategories(category)}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={onGameStart}
        sx={readyButton()}
        startIcon={<PlayArrowIcon />}
      >
        Let's Play!
      </Button>
    </Box>
  );
};
