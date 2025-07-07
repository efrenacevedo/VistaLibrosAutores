import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Snackbar,
  IconButton, Tooltip, Typography, Alert, Container, Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const API_BASE = 'http://www.autorlibrosservices.somee.com/api/autores'; 

const Autores = () => {
  const [autores, setAutores] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [idFiltro, setIdFiltro] = useState('');
  const [formAutor, setFormAutor] = useState({ nombre: '', apellido: '', fechaNacimiento: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const obtenerAutores = async () => {
    try {
      const response = await axios.get(API_BASE);
      setAutores(response.data);
    } catch (error) {
      mostrarSnackbar('Error al obtener autores', 'error');
    }
  };

  const buscar = async () => {
    try {
      if (idFiltro) {
        const response = await axios.get(`${API_BASE}/${idFiltro}`);
        setAutores([response.data]);
      } else if (nombreFiltro) {
        const response = await axios.get(`${API_BASE}/nombre/${nombreFiltro}`);
        setAutores([response.data]); // Si devuelves lista, usa response.data directamente
      } else {
        obtenerAutores();
      }
    } catch (error) {
      mostrarSnackbar('Autor no encontrado', 'warning');
      setAutores([]);
    }
  };

  const guardarAutor = async () => {
    try {
      if (editandoId) {
        await axios.put(`${API_BASE}/${editandoId}`, formAutor);
        mostrarSnackbar('Autor actualizado', 'success');
      } else {
        await axios.post(API_BASE, formAutor);
        mostrarSnackbar('Autor agregado', 'success');
      }
      setFormAutor({ nombre: '', apellido: '', fechaNacimiento: '' });
      setEditandoId(null);
      obtenerAutores();
    } catch (error) {
      mostrarSnackbar('Error al guardar autor', 'error');
    }
  };

  const eliminarAutor = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      mostrarSnackbar('Autor eliminado', 'info');
      obtenerAutores();
    } catch (error) {
      mostrarSnackbar('Error al eliminar autor', 'error');
    }
  };

  const iniciarEdicion = (autor) => {
    setFormAutor({
      nombre: autor.nombre,
      apellido: autor.apellido,
      fechaNacimiento: autor.fechaNacimiento?.substring(0, 10) || ''
    });
    setEditandoId(autor.autorLibroGuid);
  };

  const mostrarSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const cerrarSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    obtenerAutores();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Gestión de Autores
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Buscar por ID"
          value={idFiltro}
          onChange={(e) => setIdFiltro(e.target.value)}
          fullWidth
        />
        <TextField
          label="Buscar por Nombre"
          value={nombreFiltro}
          onChange={(e) => setNombreFiltro(e.target.value)}
          fullWidth
        />
        <Tooltip title="Buscar">
          <IconButton onClick={buscar} color="primary">
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Button onClick={() =>{
            setIdFiltro('');
            setNombreFiltro('');
            obtenerAutores();
        }}>Limpiar</Button>
      </Stack>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Fecha Nac.</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {autores.map((autor) => (
              <TableRow key={autor.autorLibroGuid}>
                <TableCell>{autor.autorLibroGuid}</TableCell>
                <TableCell>{autor.nombre}</TableCell>
                <TableCell>{autor.apellido}</TableCell>
                <TableCell>{autor.fechaNacimiento?.substring(0, 10)}</TableCell>
                <TableCell>
                  <Button onClick={() => iniciarEdicion(autor)} size="small">Editar</Button>
                  <Button onClick={() => eliminarAutor(autor.autorLibroGuid)} size="small" color="error">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {editandoId ? 'Editar Autor' : 'Agregar Autor'}
        </Typography>
        <Stack spacing={2} direction="column">
          <TextField
            label="Nombre"
            value={formAutor.nombre}
            onChange={(e) => setFormAutor({ ...formAutor, nombre: e.target.value })}
            fullWidth
          />
          <TextField
            label="Apellido"
            value={formAutor.apellido}
            onChange={(e) => setFormAutor({ ...formAutor, apellido: e.target.value })}
            fullWidth
          />
          <TextField
            label="Fecha de Nacimiento"
            type="date"
            value={formAutor.fechaNacimiento}
            onChange={(e) => setFormAutor({ ...formAutor, fechaNacimiento: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={guardarAutor}
            >
              {editandoId ? 'Actualizar' : 'Agregar'}
            </Button>
            {editandoId && (
              <Button
                variant="outlined"
                onClick={() => {
                  setEditandoId(null);
                  setFormAutor({ nombre: '', apellido: '', fechaNacimiento: '' });
                }}
              >
                Cancelar
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={cerrarSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={cerrarSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Autores;