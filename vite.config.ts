import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import tailwindcss from '@tailwindcss/vite'

dotenv.config({
  path: './.env'
})

export default defineConfig({
  plugins: [tailwindcss(),react()],

  server: {
    host: '0.0.0.0',
  }
})




