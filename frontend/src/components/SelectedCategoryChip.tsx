import { IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CategoryPreview } from '../types/category.type';

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
  <Paper
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      px: 2,
      py: 1,
      backgroundColor: 'primary.light',
    }}
  >
    <Typography variant="body2" sx={{ color: 'white' }}>
      {category.name}
    </Typography>
    <IconButton size="small" onClick={onRemove} sx={{ color: 'white' }}>
      <CloseIcon fontSize="small" />
    </IconButton>
  </Paper>
);
