import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // If deploying to GitHub Project Pages: https://<user>.github.io/<repo>/
  // set base to '/<repo>/' so assets resolve correctly.
  base: '/ctxly.ai/',
})


