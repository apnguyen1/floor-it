import { IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  chipContainer,
  chipText,
  closeIcon,
  removeButton,
} from './SelectedCategoryChip.style';
import { CategoryPreview } from '../../../../../types/category.type.ts';

interface SelectedCategoryChipProps {
  category: CategoryPreview;
  onRemove: () => void;
}

/**
 * Chip component for selected categories in the bottom bar
 * Shows category name with remove button
 */
export const SelectedCategoryChip = ({
  category,
  onRemove,
}: SelectedCategoryChipProps) => (
  <Paper sx={chipContainer()} elevation={0}>
    <Typography variant="body2" sx={chipText()}>
      {category.name}
    </Typography>
    <IconButton
      size="small"
      onClick={onRemove}
      sx={removeButton()}
      aria-label={`Remove ${category.name}`}
    >
      <CloseIcon fontSize="small" sx={closeIcon()} />
    </IconButton>
  </Paper>
);
