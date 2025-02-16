import { useApp } from '../../hooks/useApp.ts';
import { Button, Container, Typography } from '@mui/material';
import { ScreenType } from '../../constants/screens.ts';

export const CategoriesScreen = () => {
  const { setScreen } = useApp();

  return (
    <Container>
      <Typography variant={'h1'}>Categories Screen</Typography>
      <Button
        variant={'contained'}
        color="primary"
        size="large"
        onClick={() => setScreen(ScreenType.Game)}
      >
        Play Game!
      </Button>
    </Container>
  );
};
