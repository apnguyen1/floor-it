import { Box, Container } from '@mui/material';
import { CategoryWidget } from './CategoryWidget/CategoryWidget.tsx';
import { CategoryPreview } from '../../../../types/category.type.ts';
import {
  gridContainer,
  gridContent,
  gridItem,
  gridLayout,
} from './CategoriesGrid.style.ts';

interface CategoriesGridProps {
  categories: CategoryPreview[];
  selectedCategories: CategoryPreview[];
  onToggleCategories: (category: CategoryPreview) => void;
}

export const CategoriesGrid = ({
  categories,
  selectedCategories,
  onToggleCategories,
}: CategoriesGridProps) => {
  return (
    <Box sx={gridContainer()}>
      <Container maxWidth="xl" sx={gridContent()}>
        <Box sx={gridLayout()}>
          {categories.map((category) => (
            <Box key={category.name} sx={gridItem()}>
              <CategoryWidget
                category={category}
                onClick={() => onToggleCategories(category)}
                isSelected={selectedCategories.some((c) => c.name === category.name)}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
