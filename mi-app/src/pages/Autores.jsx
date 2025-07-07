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
// ... (importaciones iguales)
const API_BASE = 'https://tiendamicroserviciosautorapi-production.up.railway.app/api/autores';

const Autores = () => {
  const [autores, setAutores] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [idFiltro, setIdFiltro] = useState('');
  const [formAutor, setFormAutor] = useState({ nombre: '', apellido: '', fechaNacimiento: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // ✅ Nueva función
  const formatearFechaISO = (fecha) => {
    if (!fecha) return null;
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return null;
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

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
        setAutores([response.data]);
      } else {
        obtenerAutores();
      }
    } catch (error) {
      mostrarSnackbar('Autor no encontrado', 'warning');
      setAutores([]);
    }
  };

  // ✅ Modificado para usar fecha en formato correcto
  const guardarAutor = async () => {
    try {
      const autorData = {
        ...formAutor,
        fechaNacimiento: formatearFechaISO(formAutor.fechaNacimiento)
      };

      if (editandoId) {
        await axios.put(`${API_BASE}/${editandoId}`, autorData);
        mostrarSnackbar('Autor actualizado', 'success');
      } else {
        await axios.post(API_BASE, autorData);
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
      {/* ...el resto de tu JSX queda igual */}
      {/* solo modificamos la lógica, no el layout */}
    </Container>
  );
};

export default Autores;
