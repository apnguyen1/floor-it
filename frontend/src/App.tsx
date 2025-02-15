import React from 'react';
import './styles/App.css';
import { useGame } from './hooks/useGame.ts';
import { ScreenType } from './constants/screens.ts';
import { HomeScreen } from './screens/Home/HomeScreen.tsx';
import { AvatarScreen } from './screens/Avatars/AvatarScreen.tsx';
import { CategoriesScreen } from './screens/Categories/CategoriesScreen.tsx';
import { GameScreen } from './screens/Game/GameScreen.tsx';
import { GameProvider } from './context/GameContext.tsx';
import { Box, Container } from '@mui/material';

const ScreenRender: React.FC = () => {
  const { screen } = useGame();

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
  const url = '/img/app_background.png';

  return (
    <GameProvider>
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
    </GameProvider>
  );
};

export default App;
