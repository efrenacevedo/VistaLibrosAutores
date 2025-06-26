import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinkStyles = ({ isActive }) => ({
    color: 'white',
    backgroundColor: isActive ? '#1976d2' : 'transparent',
    textDecoration: 'none',
    borderRadius: 6,
    padding: '6px 12px',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Microservicios
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavLink to="/" style={navLinkStyles}>
            Libros
          </NavLink>
          <NavLink to="/autores" style={navLinkStyles}>
            Autores
          </NavLink>
          {/* Agrega más rutas aquí si las necesitas */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;