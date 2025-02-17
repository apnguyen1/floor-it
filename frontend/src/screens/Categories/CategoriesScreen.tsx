// TODOs:
// - Add a search bar to filter categories
// - Add a filter to show only categories that have images/text
// - Replace mock data with API call
// - Add a loading state (?)
// - Add a "clear all" button (?)
// - Add a loading state (?)
// - Fix UI (i.e. figure out double scrollbar situation)

import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QuizIcon from '@mui/icons-material/Quiz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CategoryPreview } from '../../types/category.type';
import { useApp } from '../../hooks/useApp';
import { ScreenType } from '../../constants/screens';
import { useState } from 'react';

// Constants
const MAX_CATEGORIES = 10; // can be changed

// Mock data for testing - TODO: Replace with API call
const MOCK_CATEGORIES: CategoryPreview[] = [
  {
    name: 'LoL Champion Titles',
    image: 'default-preview.png',
    desc: "Guess the LoL champion's name by their title!",
  },
  {
    name: 'Pokémon Types',
    image: 'default-preview.png',
    desc: 'Match the Pokémon to their primary type!',
  },
  {
    name: 'World Capitals',
    image: 'default-preview.png',
    desc: 'Test your knowledge of world capitals',
  },
  {
    name: 'Chemical Elements',
    image: 'default-preview.png',
    desc: 'Match elements to their symbols',
  },
  {
    name: 'Famous Paintings',
    image: 'default-preview.png',
    desc: 'Identify these masterpieces',
  },
  {
    name: 'Movie Quotes',
    image: 'default-preview.png',
    desc: 'Name the movie from famous quotes',
  },
  {
    name: 'Historical Figures',
    image: 'default-preview.png',
    desc: 'Match historical figures to their achievements',
  },
  {
    name: 'Programming Languages',
    image: 'default-preview.png',
    desc: 'Match languages to their use cases',
  },
  {
    name: 'Car Brands',
    image: 'default-preview.png',
    desc: 'Identify car manufacturers by their logos',
  },
  {
    name: 'Space Exploration',
    image: 'default-preview.png',
    desc: 'Test your knowledge of space missions',
  },
  {
    name: 'Ancient Civilizations',
    image: 'default-preview.png',
    desc: 'Match civilizations to their artifacts',
  },
  {
    name: 'Musical Instruments',
    image: 'default-preview.png',
    desc: 'Identify instruments by their sound',
  },
  {
    name: 'Famous Scientists',
    image: 'default-preview.png',
    desc: 'Match scientists to their discoveries',
  },
  {
    name: 'World Cuisines',
    image: 'default-preview.png',
    desc: 'Identify dishes from around the world',
  },
  {
    name: 'Sports Legends',
    image: 'default-preview.png',
    desc: 'Match athletes to their sports',
  },
  {
    name: 'Literature Classics',
    image: 'default-preview.png',
    desc: 'Match books to their authors',
  },
  {
    name: 'Animal Kingdom',
    image: 'default-preview.png',
    desc: 'Identify animals by their traits',
  },
  {
    name: 'Famous Landmarks',
    image: 'default-preview.png',
    desc: 'Name these world-famous locations',
  },
  {
    name: 'Tech Companies',
    image: 'default-preview.png',
    desc: 'Match companies to their products',
  },
  {
    name: 'Ancient Mythology',
    image: 'default-preview.png',
    desc: 'Match gods to their domains',
  },
  {
    name: 'Famous Battles',
    image: 'default-preview.png',
    desc: 'Test your knowledge of historical battles',
  },
  {
    name: 'Ocean Life',
    image: 'default-preview.png',
    desc: 'Identify marine creatures',
  },
  {
    name: 'Famous Inventions',
    image: 'default-preview.png',
    desc: 'Match inventions to their creators',
  },
  {
    name: 'World Languages',
    image: 'default-preview.png',
    desc: 'Match languages to their regions',
  },
  {
    name: 'Classic Art Styles',
    image: 'default-preview.png',
    desc: 'Identify different art movements',
  },
  {
    name: 'Human Anatomy',
    image: 'default-preview.png',
    desc: 'Match body parts to their functions',
  },
  {
    name: 'Weather Phenomena',
    image: 'default-preview.png',
    desc: 'Identify different weather events',
  },
  {
    name: 'Famous Architects',
    image: 'default-preview.png',
    desc: 'Match architects to their buildings',
  },
  {
    name: 'Plant Species',
    image: 'default-preview.png',
    desc: 'Identify different types of plants',
  },
  {
    name: 'Medieval Times',
    image: 'default-preview.png',
    desc: 'Test your knowledge of medieval history',
  },
  {
    name: 'Olympic Games',
    image: 'default-preview.png',
    desc: 'Match events to their categories',
  },
  {
    name: 'Dinosaur Species',
    image: 'default-preview.png',
    desc: 'Identify different dinosaurs',
  },
];

/**
 * Individual category card component
 * Displays category name, description, and selection state
 */
const CategoryWidget = ({
  category,
  onClick,
  isSelected,
}: {
  category: CategoryPreview;
  onClick: () => void;
  isSelected: boolean;
}) => {
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
        position: 'relative', // For check icon positioning
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

      {/* Category content container */}
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Category header with name and description */}
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

        {/* Category icon container */}
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

/**
 * Chip component for selected categories in the bottom bar
 * Shows category name with remove button
 */
const SelectedCategoryChip = ({
  category,
  onRemove,
}: {
  category: CategoryPreview;
  onRemove: () => void;
}) => (
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
