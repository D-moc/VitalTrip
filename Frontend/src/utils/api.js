// frontend/src/utils/api.js
import axios from "axios";

// Create one reusable Axios instance for all API calls
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "/", // Comes from .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
