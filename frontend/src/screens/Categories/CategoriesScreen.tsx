import { useApp } from '../../hooks/useApp.ts';
import { Button, Container, Typography } from '@mui/material';
import { ScreenType } from '../../constants/screens.ts';
import { fetchCategoryData } from '../../utils/fetch.ts';

export const CategoriesScreen = () => {
  const { setScreen, setSelectedCategory } = useApp();

  const handleCategorySelection = () => {
    const getCategories = async () => {
      await fetchCategoryData('lol_champion_titles.json').then((data) => {
        setSelectedCategory(data);
        setScreen(ScreenType.Game);
      });
    };
    getCategories();
  };

  return (
    <Container>
      <Typography variant={'h1'}>Categories Screen</Typography>
      <Button
        variant={'contained'}
        color="primary"
        size="large"
        onClick={handleCategorySelection}
      >
        Play Game!
      </Button>
    </Container>
  );
};
