import { useApp } from '../../hooks/useApp.ts';
import './Home.css';
import { ScreenType } from '../../constants/screens.ts';
import { Box, Button, Typography } from '@mui/material';
import InfoModal from '../../utils/InfoModal.tsx';
import { fetchCategories } from '../../utils/fetch.ts';

export const HomeScreen = () => {
  const { setScreen } = useApp();

  const handleFetchData = () => {
    const getData = async () => {
      return await fetchCategories();
    };
    getData().then((data) => console.log(data));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontFamily: 'Squada One',
          fontSize: '200px',
          fontWeight: 'bold',
          color: '#59ffe9',
          textShadow: '10px 10px 0px #383fc2',
        }}
      >
        Floor It!
      </Typography>

      <Button
        className={'play-button'}
        variant="contained"
        onClick={() => setScreen(ScreenType.Avatar)}
        sx={{
          borderRadius: '75px',
          fontSize: '25px',
          marginBottom: '15px',
          width: '250px',
          height: '60px',
          color: 'white',
          backgroundColor: '#383FC2',
        }}
      >
        LET'S PLAY
      </Button>
      <InfoModal />
      <Button variant="contained" color="secondary" onClick={handleFetchData}>
        FETCh
      </Button>
    </Box>
  );
};
