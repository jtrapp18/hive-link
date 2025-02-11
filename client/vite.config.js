import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    Inspect(),
    visualizer({ open: true })  // Visualizer opens automatically after build
  ],
  build: {
    target: 'esnext',  // Target modern browsers for tree shaking
    rollupOptions: {
      // Optional optimization to exclude large dependencies from the bundle
      external: ['react', 'react-dom'], // These are externalized to avoid bundling
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5555',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});