import React from 'react';
import './styles/global.style.ts';
import { useApp } from './hooks/useApp.ts';
import { ScreenType } from './constants/screens.ts';
import { HomeScreen } from './screens/Home/HomeScreen.tsx';
import { AvatarScreen } from './screens/Avatars/AvatarScreen.tsx';
import { CategoriesScreen } from './screens/Categories/CategoriesScreen.tsx';
import { GameScreen } from './screens/Game/GameScreen.tsx';
import { AppProvider } from './contexts/AppContext.tsx';
import { Box, Container, Typography } from '@mui/material';
import { homeButtonTitle } from './styles/global.style.ts';

const ScreenRender: React.FC = () => {
  const { screen, setScreen } = useApp();

  // Handler to go back to the home screen
  const handleHomeClick = () => {
    setScreen(ScreenType.Home);
  };

  // Only show the home button if we're not already on the home screen
  const showHomeButton = screen !== ScreenType.Home;

  return (
    <>
      {showHomeButton && (
        <Typography onClick={handleHomeClick} sx={homeButtonTitle()}>
          Floor It!
        </Typography>
      )}

      {screen === ScreenType.Home ? (
        <HomeScreen />
      ) : screen === ScreenType.Avatar ? (
        <AvatarScreen />
      ) : screen === ScreenType.Categories ? (
        <CategoriesScreen />
      ) : screen === ScreenType.Game ? (
        <GameScreen />
      ) : (
        <HomeScreen />
      )}
    </>
  );
};

const App: React.FC = () => {
  const url = '/img/app_background.png';

  return (
    <AppProvider>
      <Box
        sx={{
          backgroundImage: `url(${url})`,
        }}
      >
        <Container
          sx={{
            height: '100vh',
          }}
        >
          <ScreenRender />
        </Container>
      </Box>
    </AppProvider>
  );
};

export default App;
