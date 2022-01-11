import { createTheme } from '@mui/material/styles';

const noobTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6932F9',
      dark: '#160c30',
    },
    secondary: {
      main: '#F08743',
      light: '#f09633',
    },
    background: {
      default: '#08001C',
      paper: '#160C30',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b5b5b5',
    },
    action: {},
    error: {
      main: 'rgba(255, 0, 0, 0.62)',
    },
    divider: '#B39DDB',
  },
  typography: {
    fontFamily: 'Inter',
  }
});

export default noobTheme;
