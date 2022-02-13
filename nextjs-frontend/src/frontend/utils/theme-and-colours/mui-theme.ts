import { createTheme } from '@mui/material/styles';

const noobTheme = createTheme({
  palette: {
    mode: 'dark',
    success: {
      main: '#0EEB3E'
    },
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
      paper: '#100626'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b5b5b5'
    },
    action: {},
    error: {
      main: 'rgba(255, 0, 0, 0.62)',
    },
    divider: '#B39DDB',
    common: {
      white: '#fff'
    }
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontSize: '37px',
      fontFamily: "Chakra Petch",
      color: "white",
      textTransform: "uppercase",
      fontWeight: "700",
      letterSpacing: "-0.011em",
      '@media (max-width:768px)': {
        fontSize: '24px',
      },
    },
    h3: {
      fontSize: '16px',
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "24px",
      letterSpacing: "-0.011em",
      textAlign: "center",
      color: "#FFFFFF",
    },
    body1: {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '24px',
      letterSpacing: '-0.011em',
      textAlign: "center",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        colorSecondary: {
          color: '#2B243A'
        }
      }
    },
    MuiLink: {
      defaultProps: {
        style: {
          textDecorationColor: "transparent"
        }
      }
    }
  }
});

/**
 * @breakpoints
 */

//  noobTheme.typography.h1 = {
//   '@media (max-width:600px)': {
//     fontSize: '24px',
//   },
// };

export default noobTheme;
