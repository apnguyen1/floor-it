import { Box, Container } from '@mui/material';
import { CategoryWidget } from '../../components/CategoryWidget.tsx';
import { CategoryPreview } from '../../types/category.type.ts';

interface CategoriesGridProps {
  selectedCategories: CategoryPreview[];
  onToggleCategories: (categories: CategoryPreview) => void;
}

export const CategoriesGrid = ({
  selectedCategories,
  onToggleCategories,
}: CategoriesGridProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
      }}
    >
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'flex-start',
          }}
        >
          {/* Responsive grid layout for category widgets */}
          {selectedCategories.map((category, index) => (
            <Box
              key={index}
              sx={{
                width: {
                  xs: '100%', // 1 column on mobile
                  sm: 'calc((100% - 24px) / 2)', // 2 columns on tablet
                  md: 'calc((100% - 48px) / 3)', // 3 columns on desktop
                  lg: 'calc((100% - 96px) / 5)', // 5 columns on large screens
                },
                flexShrink: 0,
                flexGrow: 0,
              }}
            >
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
