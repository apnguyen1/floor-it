import { Box, Paper, Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CategoryPreview } from '../types/category.type';

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
    <Paper
      sx={{
        width: '100%',
        aspectRatio: '3/2',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        border: isSelected ? '2px solid' : 'none',
        borderColor: 'primary.main',
        position: 'relative',
      }}
      elevation={3}
      onClick={onClick}
    >
      {/* Selection indicator */}
      {isSelected && (
        <CheckCircleIcon
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'primary.main',
            backgroundColor: 'white',
            borderRadius: '50%',
          }}
        />
      )}

      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 1.5, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {category.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {category.desc}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            overflow: 'hidden',
          }}
        >
          <QuizIcon
            sx={{
              fontSize: {
                xs: '60px',
                sm: '70px',
                md: '80px',
              },
              color: 'primary.main',
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};
