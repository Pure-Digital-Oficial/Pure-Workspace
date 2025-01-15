import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

export const greenDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      dark: green[400],
      light: '#D2EACF',
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
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
});
