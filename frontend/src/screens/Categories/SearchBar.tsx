import { Box, Container, IconButton, TextField, Typography } from '@mui/material';
import { ScreenType } from '../../constants/screens.ts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useApp } from '../../hooks/useApp.ts';

export const SearchBar = () => {
  const { setScreen } = useApp();

  return (
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
        />
      </Box>
    </Container>
  );
};
