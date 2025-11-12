import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/bmkg': {
        target: 'http://202.90.198.40',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bmkg/, ''),
        secure: false,
      }
    }
  }
})
