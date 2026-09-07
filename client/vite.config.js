import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy /api requests to the backend in development
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
