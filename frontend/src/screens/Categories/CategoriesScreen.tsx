// TODOs:
// - Add a search bar to filter categories
// - Add a filter to show only categories that have images/text
// - Replace mock data with API call
// - Add a loading state (?)
// - Add a "clear all" button (?)
// - Add a loading state (?)
// - Fix UI (i.e. figure out double scrollbar situation)
// - Add setState

import { Box } from '@mui/material';
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

  /**
   * Fetches all available categories.
   */
  useEffect(() => {
    fetchCategories()
      .then((cats) => {
        setCategories(cats);
        setFilteredCategories(cats);
      })
      .catch((err) => console.error('failed to fetch Categories', err));
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
        <CategoriesGrid
          categories={filteredCategories}
          selectedCategories={selectedCategories}
          onToggleCategories={handleToggleCategories}
        />
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
