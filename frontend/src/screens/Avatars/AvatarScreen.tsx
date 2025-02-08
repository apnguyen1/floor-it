import { useGame } from '../../hooks/useGame.ts';
import { Button, Container, Typography } from '@mui/material';
import { ScreenType } from '../../constants/screens.ts';

export const AvatarScreen = () => {
  const { setScreen } = useGame();

  return (
    <Container>
      <Typography variant={'h1'}>Avatar Screen</Typography>
      <Button
        variant={'contained'}
        color="primary"
        size="large"
        onClick={() => setScreen(ScreenType.Categories)}
      >
        Confirm
      </Button>
    </Container>
  );
};
