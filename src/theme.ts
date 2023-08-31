import '@fontsource/public-sans';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from '@mui/material';
import bgImageDark from 'assets/chat-bg-pattern-dark.png';
import bgImageLight from 'assets/chat-bg-pattern-light.png';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const dark = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Public Sans',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides(theme) {
        const isDark = theme.palette.mode === 'dark';
        return {
          //scrollbar webkit
          '*::-webkit-scrollbar': {
            width: '5px',
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(128,128,128,0.3)',
            borderRadius: '10px',
          },
          //scrollbar firefox
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: '#1e1e1e transparent',
          },
          body: {
            '&::before': {
              backgroundImage: `url(${isDark ? bgImageDark : bgImageLight})`,
              backgroundSize: 'contain',
              content: '""',
              backgroundRepeat: 'repeat',
              opacity: theme.palette.mode === 'dark' ? 1 : 0.5,
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: -1,
            },
          },
        };
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          //backgroundColor: theme.palette.background.default,
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
  },
});

export const light = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: 'Public Sans',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides(theme) {
        const isDark = theme.palette.mode === 'dark';
        return {
          //scrollbar webkit
          '*::-webkit-scrollbar': {
            width: '5px',
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(128,128,128,0.3)',
            borderRadius: '10px',
          },
          //scrollbar firefox
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: '#1e1e1e transparent',
          },
          body: {
            '&::before': {
              backgroundImage: `url(${isDark ? bgImageDark : bgImageLight})`,
              backgroundSize: 'contain',
              content: '""',
              backgroundRepeat: 'repeat',
              opacity: theme.palette.mode === 'dark' ? 1 : 0.5,
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: -1,
            },
          },
        };
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          //backgroundColor: theme.palette.background.default,
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
  },
});

export const system = prefersDark ? dark : light;
