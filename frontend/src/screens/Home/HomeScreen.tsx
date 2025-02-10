import { useGame } from '../../hooks/useGame.ts';
import './Home.css';
import { ScreenType } from '../../constants/screens.ts';
import { Button } from '@mui/material';
import InfoModal from '../../utils/InfoModal.tsx';

export const HomeScreen = () => {
  const { setScreen } = useGame();

  return (
    <div className="HomeScreen">
      <h3 className={'app-title'}> Floor It!</h3>

      <Button
        className={'play-button'}
        variant="contained"
        onClick={() => setScreen(ScreenType.Avatar)}
        style={{ backgroundColor: '#383FC2', color: 'white' }}
        sx={{ borderRadius: '75px', fontSize: '25px', marginBottom: '15px' }}
      >
        LET'S PLAY
      </Button>
      <InfoModal></InfoModal>
    </div>
  );
};
