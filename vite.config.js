import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/comment': {
        target: 'https://microservicescomment.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/comment/, '/api/comment'),
      },
      '/api': {
        target: 'https://backendmicroservicespost.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
