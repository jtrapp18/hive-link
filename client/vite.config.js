import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  define: {
    global: 'window',
  },
  plugins: [
    react(),
    Inspect(),
    visualizer({ open: true })  // Visualizer opens automatically after build
  ],
  build: {
    target: 'esnext',  // Target modern browsers for tree shaking
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.RAILWAY_PUBLIC_DOMAIN || 'http://127.0.0.1:5555',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});