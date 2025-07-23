/* import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
})
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const __dirname = import.meta.dirname

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // confirm it outputs to 'dist' inside apps/web
  },
  root: path.resolve(__dirname), // optional but good to be explicit
})
