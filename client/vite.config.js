import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect';
// import visualizer from 'vite-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react({babel: {parserOpts: {plugins:[],}, plugins: []}}),
    Inspect(),
    // visualizer()
],
  server: {
    proxy: {
      '/api': {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  }
})