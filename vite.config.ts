import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Read base from environment for flexible hosting (Vercel or GitHub Pages)
const base = process.env.VITE_BASE ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
