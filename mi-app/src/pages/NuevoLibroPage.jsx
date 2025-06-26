import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { libroService } from '../api/libros';
import { 
  Box, Button, Container, Typography, Stack, IconButton,
  Paper, TextField, MenuItem
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

export default function NuevoLibroPage({ toggleTheme, mode }) {
  const navigate = useNavigate();
  const [libro, setLibro] = useState({
    titulo: '',
    fechaPublicacion: '',
    autorLibro: ''
  });

  // Autores de ejemplo - deberías reemplazar con tu propia lista
  const autores = [
    { id: '3fa85f64-5717-4562-b3fc-2c963f6afa6', nombre: 'Gabriel García Márquez' },
    { id: '3f6fc9c6-4455-42c5-a967-de9c3d700d4a', nombre: 'E.L. James' },
    { id: '4fb95f65-5718-4563-b4fd-3c964f77afa7', nombre: 'J.K. Rowling' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await libroService.crearLibro(libro);
      navigate('/libros', { state: { success: 'Libro creado exitosamente' } });
    } catch (error) {
      console.error('Error creando libro:', error);
      navigate('/libros', { state: { error: 'Error al crear libro' } });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLibro(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={4}>
          <IconButton onClick={() => navigate('/libros')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Agregar Nuevo Libro
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Título"
            name="titulo"
            value={libro.titulo}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            select
            label="Autor"
            name="autorLibro"
            value={libro.autorLibro}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 3 }}
          >
            {autores.map((autor) => (
              <MenuItem key={autor.id} value={autor.id}>
                {autor.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Fecha Publicación"
            type="date"
            name="fechaPublicacion"
            value={libro.fechaPublicacion}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2, py: 1.5, borderRadius: 1 }}
          >
            Guardar Libro
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}