import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/index.scss";' // 添加公共样式
      }
    }
  }
})

