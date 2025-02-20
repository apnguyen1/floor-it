import { SxProps, Theme } from '@mui/material';
import { PlayerState } from '../../types/context.type.ts';

export const gameBox = (players: {
  P1: PlayerState;
  P2: PlayerState;
}): SxProps<Theme> => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  padding: 2,
  borderRadius: 25,
  background: `linear-gradient(to right, ${players.P1.color} 50%, ${players.P2.color} 50%)`,
});
