import React from 'react';
import './styles/FloorIt.css';
import { useGame } from '../hooks/useGame.ts';
import { ScreenType } from '../constants/screens.ts';
import { HomeScreen } from '../screens/Home/HomeScreen.tsx';
import { AvatarScreen } from '../screens/Avatars/AvatarScreen.tsx';
import { CategoriesScreen } from '../screens/Categories/CategoriesScreen.tsx';
import { GameSceen } from '../screens/Game/GameSceen.tsx';
import { GameProvider } from '../context/GameContext.tsx';

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
      return <GameSceen></GameSceen>;
    default:
      return <HomeScreen></HomeScreen>;
  }
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className={'app-container'}>
        <div className={'content-container'}>
          <ScreenRender></ScreenRender>
        </div>
      </div>
    </GameProvider>
  );
};

export default App;
