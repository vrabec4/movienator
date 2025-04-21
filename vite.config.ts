import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@types': path.resolve(__dirname, './src/types'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/lib'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
          'tanstack-query': [
            '@tanstack/react-query', 
            '@tanstack/react-query-devtools',
            '@tanstack/query-sync-storage-persister',
            '@tanstack/react-query-persist-client'
          ],
          'features': ['./src/features/movies/index.ts'],
          'components': ['./src/components/StyledComponents.tsx']
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  server: {
    proxy: {
      '/api/omdb': {
        target: 'https://www.omdbapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/omdb/, ''),
        secure: true,
      },
    },
  },
});
