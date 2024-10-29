import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Tu base URL de la API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptores para manejo de token si lo necesitas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Si usas autenticación
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
