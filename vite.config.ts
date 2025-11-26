import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Casting process to any to avoid TS errors during build
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Passes the API_KEY from the build environment (Netlify/Vercel) to the browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  }
})