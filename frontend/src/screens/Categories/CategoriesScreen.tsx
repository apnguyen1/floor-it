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
import { fetchCategories } from '../../utils/fetch.ts';
import { SearchBar } from './SearchBar.tsx';
import { CategoriesGrid } from './CategoriesGrid.tsx';
import { SelectionBar } from './SelectionBar.tsx';
import { useApp } from '../../hooks/useApp.ts';

/**
 * Main Categories screen component
 * Allows users to browse, search, and select categories for the game
 */
export const CategoriesScreen = () => {
  const { setScreen, setSelectedCategory } = useApp();
  const [categories, setCategories] = useState<CategoryPreview[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryPreview[]>([]);

  /**
   * Fetches all available categories.
   */
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
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

  const handleGameStart = () => {
    setSelectedCategory(selectedCategories.map((c) => c.name));
    setScreen(ScreenType.Game);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
      }}
    >
      {/*Search Bar */}
      <SearchBar />
      {/*Grid of Categories*/}
      <CategoriesGrid
        selectedCategories={categories}
        onToggleCategories={handleToggleCategories}
      />
      {/* Selection bar */}
      <SelectionBar
        selectedCategories={selectedCategories}
        onToggleCategories={handleToggleCategories}
        onGameStart={handleGameStart}
      />
    </Box>
  );
};
