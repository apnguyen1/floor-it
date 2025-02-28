import React from 'react';
import './styles/global.style.css';
import { useApp } from './hooks/useApp.ts';
import { ScreenType } from './constants/screens.ts';
import { HomeScreen } from './screens/Home/HomeScreen.tsx';
import { AvatarScreen } from './screens/Avatars/AvatarScreen.tsx';
import { CategoriesScreen } from './screens/Categories/CategoriesScreen.tsx';
import { GameScreen } from './screens/Game/GameScreen.tsx';
import { AppProvider } from './contexts/AppContext.tsx';
import { Box, Container } from '@mui/material';

const ScreenRender: React.FC = () => {
  const { screen } = useApp();

  switch (screen) {
    case ScreenType.Home:
      return <HomeScreen></HomeScreen>;
    case ScreenType.Avatar:
      return <AvatarScreen></AvatarScreen>;
    case ScreenType.Categories:
      return <CategoriesScreen></CategoriesScreen>;
    case ScreenType.Game:
      return <GameScreen></GameScreen>;
    default:
      return <HomeScreen></HomeScreen>;
  }
};

const App: React.FC = () => {
  const url = '/img/app_background2.png';

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
