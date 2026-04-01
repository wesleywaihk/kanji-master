'use client';

import { createTheme } from '@mui/material/styles';
import { sakuraPalette } from '@/theme/palette';

declare module '@mui/material/styles' {
  interface Palette {
    sakura: {
      bloom: string;
      coral: string;
      mist: string;
      iris: string;
    };
  }

  interface PaletteOptions {
    sakura?: {
      bloom: string;
      coral: string;
      mist: string;
      iris: string;
    };
  }
}

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: sakuraPalette.dusk,
      light: sakuraPalette.iris,
    },
    secondary: {
      main: sakuraPalette.coral,
    },
    background: {
      default: '#fffafc',
      paper: 'rgba(255, 255, 255, 0.78)',
    },
    text: {
      primary: sakuraPalette.dusk,
      secondary: sakuraPalette.iris,
    },
    sakura: {
      bloom: sakuraPalette.bloom,
      coral: sakuraPalette.coral,
      mist: sakuraPalette.mist,
      iris: sakuraPalette.iris,
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: '"Noto Sans JP", "Hiragino Sans", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    button: {
      fontWeight: 700,
      letterSpacing: '0.08em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 112,
          borderRadius: 28,
          boxShadow: '0 18px 30px rgba(80, 84, 119, 0.16)',
          textTransform: 'none',
        },
      },
    },
  },
});
