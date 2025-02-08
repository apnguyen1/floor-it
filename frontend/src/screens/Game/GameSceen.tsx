import { useGame } from '../../hooks/useGame.ts';
import { Button, Container, Typography } from '@mui/material';
import { ScreenType } from '../../constants/screens.ts';

export const GameSceen = () => {
  const { setScreen } = useGame();

  return (
    <Container>
      <Typography variant={'h1'}>Game Screen</Typography>
      <Button
        variant={'contained'}
        color="primary"
        size="large"
        onClick={() => setScreen(ScreenType.Categories)}
      >
        Go back to categories
      </Button>
    </Container>
  );
};
