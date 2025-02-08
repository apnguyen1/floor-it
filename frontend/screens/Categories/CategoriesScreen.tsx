import { useGame } from '../../hooks/useGame';
import { Button, Container, Typography } from '@mui/material';
import { ScreenType } from '../../constants/screens';

export const CategoriesScreen = () => {
  const { setScreen } = useGame();

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
