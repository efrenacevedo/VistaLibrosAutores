import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Asegúrate que el backend corre en ese puerto
});

export default api;
