import axios from 'axios';

const api = axios.create({
 // baseURL: import.meta.env.VITE_API_URL || 'https://localhost:5000/api',
baseURL: import.meta.env.VITE_API_URL || 'https://utttmicrolibro-production.up.railway.app/api',
 
});
// Middleware para insertar token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // o de donde lo guardes
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const libroService = {
  crearLibro: (libroData) => api.post('/LibroMaterial/crear/', libroData),
  obtenerLibros: () => api.get('/LibroMaterial'),
  obtenerLibroPorId: (id) => api.get(`/LibroMaterial/${id}`),
};