import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
