import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          styling: ['styled-components', 'framer-motion']
        }
      }
    },
    target: 'esnext',
    assetsDir: 'assets',
    emptyOutDir: true,
    cssCodeSplit: true
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true
  }
})
