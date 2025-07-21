import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lightTheme, darkTheme } from './Theme';
import LibrosPage from './pages/LibrosPages';
import NuevoLibroPage from './pages/NuevoLibroPage';
import Autores from './pages/Autores';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Recover from './pages/Recover';

function App() {
  const [mode, setMode] = useState('light');
  
  const theme = useMemo(() => 
    mode === 'light' ? lightTheme : darkTheme
  , [mode]);

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/login" element={<Login toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/register" element={<Register toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/recover" element={<Recover toggleTheme={toggleTheme} mode={mode} />} />
          <Route path="/libros" element={
            <LibrosPage toggleTheme={toggleTheme} mode={mode} />
          } />
          <Route path="/libros/nuevo" element={
            <NuevoLibroPage toggleTheme={toggleTheme} mode={mode} />
          } />
          <Route path="/autores" element={
            <Autores toggleTheme={toggleTheme} mode={mode} />
          } />
          <Route path="*" element={
            <LibrosPage toggleTheme={toggleTheme} mode={mode} />
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;