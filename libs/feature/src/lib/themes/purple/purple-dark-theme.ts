import { createTheme } from '@mui/material';

export const PurpleDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F41A43',
      dark: '#FD496E',
      light: '#F41A43',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#24153C',
      dark: '#342B5E',
      light: '#3B376F',
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
  },
});
