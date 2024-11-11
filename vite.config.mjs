import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@/styles/resources" as *;\n',
      },
    },
  },

  plugins: [vue(), svgLoader({ defaultImport: 'component' })],
})
