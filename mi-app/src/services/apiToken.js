import axios from "axios";

const api = axios.create({
  baseURL: "https://utttmicrolibro-production.up.railway.app/", // Asegúrate que el backend corre en ese puerto
});

// Middleware para insertar token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Interceptor: token a enviar ->", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Header Authorization agregado:", config.headers.Authorization);
    } else {
      console.log("No hay token para enviar.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
