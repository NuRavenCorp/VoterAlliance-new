import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'

const devApiTarget = process.env.VITE_DEV_API_PROXY_TARGET || 'http://localhost:5231'

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: devApiTarget,
        changeOrigin: true,
      },
      '/weatherforecast': {
        target: devApiTarget,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});