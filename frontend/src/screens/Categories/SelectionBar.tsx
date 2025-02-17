import { Box, Button, Typography } from '@mui/material';
import { MAX_CATEGORIES } from '../../constants/screens.ts';
import { SelectedCategoryChip } from '../../components/SelectedCategoryChip.tsx';
import { CategoryPreview } from '../../types/category.type.ts';

interface SelectionBarProps {
  selectedCategories: CategoryPreview[];
  onToggleCategories: (categories: CategoryPreview) => void;
  onGameStart: () => void;
}

export const SelectionBar = ({
  selectedCategories,
  onToggleCategories,
  onGameStart,
}: SelectionBarProps) => {
  return (
    selectedCategories.length > 0 && (
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          p: 2,
          backgroundColor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            minWidth: 'fit-content',
            color:
              selectedCategories.length === MAX_CATEGORIES
                ? 'error.main'
                : 'text.secondary',
          }}
        >
          {selectedCategories.length}/{MAX_CATEGORIES} Categories
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            py: 1,
          }}
        >
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
    )
  );
};
