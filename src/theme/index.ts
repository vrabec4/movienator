import { createTheme } from '@mui/material/styles';

const movienatorRed = '#E50914';
const movienatorDarkerRed = '#B3060F';
const movienatorBlack = '#141414';
const movienatorDarkGray = '#181818';
const movienatorMediumGray = '#2F2F2F';
const movienatorLightGray = '#808080';
const movienatorWhite = '#FFFFFF';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: movienatorRed,
    },
    secondary: {
      main: movienatorWhite,
    },
    background: {
      default: movienatorBlack,
      paper: movienatorDarkGray,
    },
    text: {
      primary: movienatorWhite,
      secondary: movienatorLightGray,
    },
    action: {
      active: movienatorRed,
      hover: movienatorMediumGray,
    },
  },
  typography: {
    fontFamily: [
      'Movienator Sans',
      'Helvetica Neue',
      'Segoe UI',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: movienatorBlack,
          boxShadow: 'none',
          borderBottom: `1px solid ${movienatorMediumGray}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          paddingLeft: 15,
          paddingRight: 15,
          '&:hover': {
            backgroundColor: movienatorDarkerRed,
            color: movienatorWhite,
          },
        },
        contained: {
          backgroundColor: movienatorRed,
          color: movienatorWhite,
          '&:hover': {
            backgroundColor: movienatorDarkerRed,
          },
        },
        outlined: {
          borderColor: movienatorRed,
          color: movienatorRed,
          '&:hover': {
            backgroundColor: 'rgba(229, 9, 20, 0.08)',
            borderColor: movienatorRed,
            color: movienatorWhite,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: movienatorDarkGray,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: movienatorDarkGray,
        },
      },
    },
  },
});

export default theme;
