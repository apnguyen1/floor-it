import { Box, Button, Typography } from '@mui/material';
import { MAX_CATEGORIES } from '../../../../constants/screens';
import { SelectedCategoryChip } from '../../../../components/SelectedCategoryChip';
import { CategoryPreview } from '../../../../types/category.type';
import {
  selectionBarContainer,
  selectedCategoriesContainer,
  categoryCounter,
} from './SelectionBar.style';

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
      <Typography variant="subtitle2" sx={categoryCounter(isMaxSelected)}>
        {selectedCategories.length}/{MAX_CATEGORIES} Categories
      </Typography>

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
        color="primary"
        onClick={onGameStart}
        sx={{ minWidth: 100 }}
      >
        Ready!
      </Button>
    </Box>
  );
};
