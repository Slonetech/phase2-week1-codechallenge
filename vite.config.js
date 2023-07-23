import jsonServer from 'vite-plugin-simple-json-server';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsonServer({ watch: 'db.json' })],
})
