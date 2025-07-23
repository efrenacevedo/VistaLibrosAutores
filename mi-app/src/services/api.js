import axios from "axios";

const api = axios.create({
  baseURL: "https://inenodemicros-production.up.railway.app/api", // Asegúrate que el backend corre en ese puerto
});

// Middleware para insertar token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 👈 Aquí va el token
    }
    return config;
  },
  (error) => Promise.reject(error)  
);

export default api;
