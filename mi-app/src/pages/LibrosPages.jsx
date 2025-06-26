import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { libroService } from '../api/libros';
import { 
  Box, Button, TextField, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Alert, Snackbar, IconButton, Tooltip,
  Typography, Avatar, Chip, Stack, Container
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon, 
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon
} from '@mui/icons-material';

export default function LibrosPage({ toggleTheme, mode }) {
  const [libros, setLibros] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      const response = await libroService.obtenerLibros();
      setLibros(response.data);
    } catch (error) {
      mostrarAlerta('Error cargando libros', 'error');
    }
  };

  const mostrarAlerta = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX');
  };

  // Función para generar color único basado en ID del autor
  const getAuthorColor = (authorId) => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50'];
    const index = parseInt(authorId.replace(/\D/g, '')) % colors.length;
    return colors[index];
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Gestión de Libros
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Tooltip title={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'light' ? <DarkIcon /> : <LightIcon />}
            </IconButton>
          </Tooltip>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/libros/nuevo')}
            sx={{ borderRadius: 2 }}
          >
            Agregar Libro
          </Button>
        </Stack>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            sx: { borderRadius: 2 }
          }}
        />
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          boxShadow: 3,
          maxHeight: '70vh'
        }}
      >
        <Table stickyHeader aria-label="Tabla de libros">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>LibroId</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fecha Publicación</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Autor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libros
              .filter(libro => 
                searchId ? 
                libro.libreriaMaterialId.toLowerCase().includes(searchId.toLowerCase()) : 
                true
              )
              .map((libro) => (
                <TableRow 
                  key={libro.libreriaMaterialId}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    {libro.libreriaMaterialId}
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="medium">
                      {libro.titulo}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDate(libro.fechaPublicacion)}</TableCell>
                  <TableCell>
                    <Chip
                      avatar={
                        <Avatar sx={{ 
                          bgcolor: getAuthorColor(libro.autorLibro),
                          width: 24, 
                          height: 24,
                          fontSize: '0.75rem'
                        }}>
                          {libro.autorLibro ? libro.autorLibro.charAt(0).toUpperCase() : '?'}
                        </Avatar>
                      }
                      label={libro.autorLibro || 'Desconocido'}
                      variant="outlined"
                      sx={{ 
                        borderColor: getAuthorColor(libro.autorLibro),
                        color: 'text.primary'
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}