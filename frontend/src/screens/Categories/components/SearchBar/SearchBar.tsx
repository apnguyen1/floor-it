import { Box, Container, IconButton, TextField, Typography } from '@mui/material';
import { ScreenType } from '../../../../constants/screens';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useApp } from '../../../../hooks/useApp';
import {
  searchBarContainer,
  searchBarContent,
  searchField,
  titleContainer,
} from './SearchBar.style';
import { InputAdornment } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { setScreen } = useApp();

  return (
    <Container maxWidth="xl" sx={searchBarContainer()}>
      <Box sx={searchBarContent()}>
        <Box sx={titleContainer()}>
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
          onChange={(e) => onSearch(e.target.value)}
          sx={searchField()}
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
  );
};
