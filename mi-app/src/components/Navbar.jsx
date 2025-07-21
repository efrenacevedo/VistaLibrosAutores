import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const navLinkStyles = ({ isActive }) => ({
    color: 'white',
    backgroundColor: isActive ? '#1976d2' : 'transparent',
    textDecoration: 'none',
    borderRadius: 6,
    padding: '6px 12px',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("token"));
    checkAuth();

    window.addEventListener("storage", checkAuth);

    // Verifica cada segundo si el token sigue activo (por navegación interna)
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Microservicios
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isLoggedIn && (
            <>
              <NavLink to="/libros" style={navLinkStyles}>
                Libros
              </NavLink>
              <NavLink to="/autores" style={navLinkStyles}>
                Autores
              </NavLink>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="inherit"
                sx={{ ml: 2 }}
              >
                Cerrar sesión
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
