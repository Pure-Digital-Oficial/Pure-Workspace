import { createTheme } from '@mui/material';

export const RedLightTheme = createTheme({
  palette: {
    primary: {
      main: '#9c1b1f',
      dark: '#7c1518',
      light: '#af484b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8e8e8e',
      dark: '#555555',
      light: '#d1d1d1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f6f3',
      paper: '#ffffff',
    },
  },
});
