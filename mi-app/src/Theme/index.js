import { createTheme } from '@mui/material/styles';

// Tema claro
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Azul Material-UI
    },
    secondary: {
      main: '#9c27b0', // Morado
    },
    background: {
      default: '#f8f9fa', // Gris muy claro
      paper: '#ffffff',   // Blanco
    },
  },
  shape: {
    borderRadius: 12, // Bordes más redondeados
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", sans-serif',
    h1: {
      fontWeight: 800,
    },
  },
});

// Tema oscuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Azul claro
    },
    secondary: {
      main: '#ce93d8', // Morado claro
    },
    background: {
      default: '#121212', // Casi negro
      paper: '#1e1e1e',   // Gris oscuro
    },
  },
  // Mantiene misma configuración de formas y tipografía
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: 'dark',
  },
});