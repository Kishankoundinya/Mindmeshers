import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',                // bind to all interfaces
    port: process.env.PORT || 3000,  // use Render's port
    allowedHosts: ['mindmeshers.onrender.com'] // allow Render domain
  }
})
