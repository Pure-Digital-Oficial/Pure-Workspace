import { createTheme } from '@mui/material';

export const MargentaBlueDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#111116',
      dark: '#0f0f14',
      light: '#16161b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c1b1f',
      dark: '#722022',
      light: '#b33236',
      contrastText: '#ffffff',
    },
    background: {
      default: '#202124',
      paper: '#303134',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    },
    fontFamily: '"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
