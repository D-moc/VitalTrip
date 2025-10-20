import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Full Vite Configuration with Backend Proxy
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173, // frontend port
    proxy: {
      "/users": {
        target: "http://localhost:4000", // backend API base
        changeOrigin: true,
        secure: false,
      },
      "/captains": {
        target: "http://localhost:4000", // backend API base
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
