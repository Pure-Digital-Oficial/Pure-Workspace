import { createTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';

export const PurpleLightTheme = createTheme({
  palette: {
    primary: {
      main: '#C897EF',
      dark: purple[800],
      light: purple[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: green[900],
      dark: green[400],
      light: green[300],
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f6f3',
      paper: '#ffffff',
    },
  },
});
