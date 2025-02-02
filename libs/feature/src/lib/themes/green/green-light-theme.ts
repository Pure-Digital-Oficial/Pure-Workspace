import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

export const greenLightTheme = createTheme({
  palette: {
    primary: {
      main: '#1B7A43',
      dark: green[400],
      light: '#D2EACF',
      contrastText: '#3C3838',
    },
    background: {
      default: '#f7f6f3',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
