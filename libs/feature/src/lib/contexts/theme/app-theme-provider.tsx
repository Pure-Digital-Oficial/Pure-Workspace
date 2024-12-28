import { Box, Theme, ThemeProvider } from '@mui/material';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { ThemeContext } from './theme-context';
import { ThemeName } from '../../types';
import { RedLightTheme, RedDarkTheme } from '../../themes';
import { getItemLocalStorage, setItemLocalStorage } from '../../services';

interface AppThemeProviderProps {
  children: ReactNode;
  selectedLightTheme?: Theme;
  selectedDarkTheme?: Theme;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
  selectedLightTheme = RedLightTheme,
  selectedDarkTheme = RedDarkTheme,
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    return getItemLocalStorage('theme') || 'light';
  });

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => {
      const newThemeName = oldThemeName === 'light' ? 'dark' : 'light';
      setItemLocalStorage(newThemeName, 'theme');
      return newThemeName;
    });
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return selectedLightTheme;

    return selectedDarkTheme;
  }, [themeName, selectedLightTheme, selectedDarkTheme]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
