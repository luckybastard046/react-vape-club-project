import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  build: {
    sourcemap: false, // Helpful for debugging and analysis
  },
})
