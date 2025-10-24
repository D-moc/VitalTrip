

// // utils/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
//   withCredentials: false, // ✅ disable cookies; you’re using JWT
// });

// // ✅ Intercept every request and attach the correct JWT key
// api.interceptors.request.use((config) => {
//   const token =
//     localStorage.getItem("authToken") || // main key (used after login)
//     localStorage.getItem("userToken") || // fallback
//     localStorage.getItem("token"); // last fallback
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true, // ✅ keep true for CORS and tokens
});

// ✅ Automatically attach JWT on every request
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("captainToken") ||
    localStorage.getItem("userToken") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
