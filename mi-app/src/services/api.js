import axios from "axios";

const api = axios.create({
  baseURL: "https://ine-node-micro-s-pwq4-git-main-efrenacevedos-projects.vercel.app/api", // Asegúrate que el backend corre en ese puerto
});

export default api;
