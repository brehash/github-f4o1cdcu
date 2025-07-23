import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',  // <— listen on all interfaces
    port: 5173,
  },
  define: {
    'process.env': {}
  }
})
