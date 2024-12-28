import { useContext } from 'react';
import { ThemeContext } from './theme-context';

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};
