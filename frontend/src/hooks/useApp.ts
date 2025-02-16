import { useContext } from 'react';
import { AppContext } from '../context/AppContext.tsx';

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used to use');

  return context;
};
