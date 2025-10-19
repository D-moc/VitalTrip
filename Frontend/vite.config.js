// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Full Vite Configuration with Backend Proxy
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // your frontend dev port
    proxy: {
      "/users": {
        target: "http://localhost:4000", // backend port
        changeOrigin: true,
        secure: false,
      },
      "/captains": {
        target: "http://localhost:4000", // backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
