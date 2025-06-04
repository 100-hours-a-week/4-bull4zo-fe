import tailwindcss from '@tailwindcss/vite'
import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import react from '@vitejs/plugin-react'
import imageminSvgo from 'imagemin-svgo'
import path from 'path'
// import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({ svgrOptions: { icon: true } }),
    // visualizer({ open: true }),
    viteImagemin({
      plugins: {
        svg: imageminSvgo(),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
