import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
      port: 5173,
      // In dev, /api is proxied to the local backend so the browser sees one origin,
      // exactly like production (where vercel.json rewrites /api to the backend project).
      proxy: {
        '/api': { target: env.DEV_API_PROXY_TARGET || 'http://localhost:5000', changeOrigin: true },
      },
    },
  }
})
