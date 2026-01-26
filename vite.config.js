import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/translate': {
        target: 'https://translate.argosopentech.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/translate-alt': {
        target: 'https://libretranslate.de',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/translate-alt/, '/translate'),
      },
    },
  },
})
