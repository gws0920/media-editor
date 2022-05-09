import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
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

