import axios from "axios";

const api = axios.create({
  baseURL: "https://ine-node-micro-s.vercel.app/api", // Asegúrate que el backend corre en ese puerto
});

export default api;
