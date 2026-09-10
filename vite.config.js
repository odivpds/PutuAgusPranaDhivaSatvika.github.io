import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 1600, // Increase chunk limit to suppress warning for single-page portfolio
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress EVAL warning from lottie-web which is a known issue
        if (warning.code === 'EVAL' && warning.loc?.file?.includes('lottie')) {
          return;
        }
        warn(warning);
      }
    }
  }
})
