import axios from "axios";

const api = axios.create({
  baseURL: "https://inenodemicros-production.up.railway.app/api", // Asegúrate que el backend corre en ese puerto
});

export default api;
