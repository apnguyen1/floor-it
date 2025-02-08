import { useGame } from '../../hooks/useGame.ts';
import { Button, Container, Typography } from '@mui/material';
import { ScreenType } from '../../constants/screens.ts';

export const HomeScreen = () => {
  const { setScreen } = useGame();

  return (
    <Container>
      <Typography variant={'h1'}>Floor It</Typography>
      <Button
        variant={'contained'}
        color="primary"
        size="large"
        onClick={() => setScreen(ScreenType.Avatar)}
      >
        Let's Play
      </Button>
    </Container>
  );
};
