import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: 'dist',
  },
  base: '/',
  server: {
    proxy: {
      '/api/comment': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/comment/, '/api/comment'),
      },
      '/api/post': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/post/, '/post'),
      },
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
