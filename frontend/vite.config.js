import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 8082,
      host: 'localhost',
      protocol: 'ws',
    },
  },
})
