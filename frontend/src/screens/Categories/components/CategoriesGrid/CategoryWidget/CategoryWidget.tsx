import { Box, Paper, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  categoryDescription,
  categoryImage,
  categoryTitle,
  categoryWidgetContainer,
  contentContainer,
  headerContainer,
  imageContainer,
  selectionIndicator,
} from './CategoryWidget.style';
import { CategoryPreview } from '../../../../../types/category.type.ts';

interface CategoryWidgetProps {
  category: CategoryPreview;
  onClick: () => void;
  isSelected: boolean;
}

/**
 * Individual category card component
 * Displays category name, description, and selection state
 */
export const CategoryWidget = ({
  category,
  onClick,
  isSelected,
}: CategoryWidgetProps) => {
  return (
    <Paper sx={categoryWidgetContainer(isSelected)} elevation={3} onClick={onClick}>
      {isSelected && <CheckCircleIcon sx={selectionIndicator()} />}

      <Box sx={contentContainer()}>
        <Box sx={headerContainer()}>
          <Typography variant="subtitle1" sx={categoryTitle()}>
            {category.name}
          </Typography>
          <Typography
            variant={'body2'}
            color={'textSecondary'}
            sx={categoryDescription()}
          >
            {category.desc}
          </Typography>
        </Box>

        <Box sx={imageContainer()}>
          <Box
            component="img"
            sx={categoryImage()}
            src={`previews/${category.image}`}
            alt={category.name}
          />
        </Box>
      </Box>
    </Paper>
  );
};
