import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://biblia.filipelopes.me",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1/biblia"),
      },
    },
  },
});
