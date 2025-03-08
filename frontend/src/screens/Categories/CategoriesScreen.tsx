import { Box, CircularProgress, Typography } from '@mui/material';
import { CategoryPreview } from '../../types/category.type';
import { MAX_CATEGORIES, ScreenType } from '../../constants/screens';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../utils/fetch';
import { SearchBar } from './components/SearchBar/SearchBar';
import { CategoriesGrid } from './components/CategoriesGrid/CategoriesGrid';
import { SelectionBar } from './components/SelectionBar/SelectionBar';
import { useApp } from '../../hooks/useApp';
import { categoriesBox, categoriesContent } from './CategoriesScreen.style';

/**
 * Main Categories screen component
 * Allows users to browse, search, and select categories for the game
 */
export const CategoriesScreen = () => {
  const { setScreen, setSelectedCategory } = useApp();
  const [categories, setCategories] = useState<CategoryPreview[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<CategoryPreview[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches all available categories.
   */
  useEffect(() => {
    setIsLoading(true);
    fetchCategories()
      .then((cats) => {
        setCategories(cats);
        setFilteredCategories(cats);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('failed to fetch Categories', err);
        setIsLoading(false);
      });
  }, []);

  /**
   * Handles category selection/deselection
   * Prevents selecting more than MAX_CATEGORIES
   */
  const handleToggleCategories = (category: CategoryPreview) => {
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

  /**
   * Handles search functionality
   */
  const handleSearch = (query: string) => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredCategories(filtered);
  };

  /**
   * Handles game start
   */
  const handleGameStart = () => {
    setSelectedCategory(selectedCategories.map((c) => c.name));
    setScreen(ScreenType.Game);
  };

  return (
    <Box sx={categoriesBox()}>
      <Box sx={categoriesContent()}>
        <SearchBar onSearch={handleSearch} />

        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              p: 4,
            }}
          >
            <CircularProgress size={60} sx={{ color: '#383FC2', mb: 2 }} />
            <Typography variant="h6" color="primary.main">
              Loading Categories...
            </Typography>
          </Box>
        ) : filteredCategories.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              p: 4,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No categories found matching your search
            </Typography>
          </Box>
        ) : (
          <CategoriesGrid
            categories={filteredCategories}
            selectedCategories={selectedCategories}
            onToggleCategories={handleToggleCategories}
          />
        )}

        {selectedCategories.length > 0 && (
          <SelectionBar
            selectedCategories={selectedCategories}
            onToggleCategories={handleToggleCategories}
            onGameStart={handleGameStart}
          />
        )}
      </Box>
    </Box>
  );
};
