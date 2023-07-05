import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/static/core",
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      output: {
        entryFileNames: "js/main.js",
        assetFileNames: asset => {
          if (asset.name == "index.css")
            return "css/style.css"
          return asset.name
        }
      }
    }
  }
})
