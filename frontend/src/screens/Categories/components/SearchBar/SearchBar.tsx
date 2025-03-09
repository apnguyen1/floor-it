import React from 'react';
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useRenderTracker } from '../../../../utils/renderTracker.tsx';
import { useApp } from '../../../../hooks/useApp.ts';
import { ScreenType } from '../../../../constants/screens.ts';
import {
  backButton,
  categoryTitle,
  searchBarContainer,
  searchBarContent,
  searchField,
  titleContainer,
} from './SearchBar.style.ts';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = React.memo(({ onSearch }: SearchBarProps) => {
  useRenderTracker('SearchBar');
  const { setScreen } = useApp();

  // Memoize the event handler
  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch],
  );

  // Memoize the back button click handler
  const handleBackClick = React.useCallback(() => {
    setScreen(ScreenType.Avatar);
  }, [setScreen]);

  return (
    <Container maxWidth="xl" sx={searchBarContainer()}>
      <Box sx={searchBarContent()}>
        <Box sx={titleContainer()}>
          <IconButton onClick={handleBackClick} sx={backButton()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={categoryTitle()}>
            Categories
          </Typography>
        </Box>

        <OutlinedInput
          placeholder="Search categories..."
          size="small"
          onChange={handleSearchChange}
          sx={searchField()}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          }
        />
      </Box>
    </Container>
  );
});
