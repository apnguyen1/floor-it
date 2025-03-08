import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { ScreenType } from '../../../../constants/screens';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useApp } from '../../../../hooks/useApp';
import {
  backButton,
  categoryTitle,
  searchBarContainer,
  searchBarContent,
  searchField,
  titleContainer,
} from './SearchBar.style';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { setScreen } = useApp();

  return (
    <Container maxWidth="xl" sx={searchBarContainer()}>
      <Box sx={searchBarContent()}>
        <Box sx={titleContainer()}>
          <IconButton onClick={() => setScreen(ScreenType.Avatar)} sx={backButton()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={categoryTitle()}>
            Categories
          </Typography>
        </Box>

        <OutlinedInput
          placeholder="Search categories..."
          size="small"
          onChange={(e) => onSearch(e.target.value)}
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
};
