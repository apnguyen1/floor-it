// TODOs:
// - Add a search bar to filter categories
// - Add a filter to show only categories that have images/text
// - Replace mock data with API call
// - Add a loading state (?)
// - Add a "clear all" button (?)
// - Add a loading state (?)
// - Fix UI (i.e. figure out double scrollbar situation)
// - Add setState

import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CategoryPreview } from '../../types/category.type';
import { useApp } from '../../hooks/useApp';
import { MAX_CATEGORIES, MOCK_CATEGORIES, ScreenType } from '../../constants/screens';
import { useState } from 'react';
import { CategoryWidget } from '../../components/CategoryWidget';
import { SelectedCategoryChip } from '../../components/SelectedCategoryChip';

/**
 * Main Categories screen component
 * Allows users to browse, search, and select categories for the game
 */
export const CategoriesScreen = () => {
  const { setScreen } = useApp();
  const [selectedCategories, setSelectedCategories] = useState<CategoryPreview[]>([]);

  /**
   * Handles category selection/deselection
   * Prevents selecting more than MAX_CATEGORIES
   */
  const toggleCategory = (category: CategoryPreview) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.some((c) => c.name === category.name);
      if (isSelected) {
        return prev.filter((c) => c.name !== category.name);
      }
      if (prev.length >= MAX_CATEGORIES) {
        return prev; // Don't add if max is reached
      }
      return [...prev, category];
    });
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Fixed header */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => setScreen(ScreenType.Avatar)}
              sx={{ color: 'primary.main' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              Categories
            </Typography>
          </Box>

          <TextField
            placeholder="Search categories..."
            variant="outlined"
            size="small"
            sx={{
              width: 300,
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Container>

      {/* Scrollable category container */}
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
            {MOCK_CATEGORIES.map((category, index) => (
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
                  onClick={() => toggleCategory(category)}
                  isSelected={selectedCategories.some((c) => c.name === category.name)}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Selection bar */}
      {selectedCategories.length > 0 && (
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
                onRemove={() => toggleCategory(category)}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setScreen(ScreenType.Game)}
            sx={{ minWidth: 100 }}
          >
            Ready!
          </Button>
        </Box>
      )}
    </Box>
  );
};
