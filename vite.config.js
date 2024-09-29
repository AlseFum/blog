import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173, // Vite 服务器的端口
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 本地服务器的地址和端口
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api/': '', // 将请求中的 '/api' 替换为空字符串
        // },
      },"/api/*":{
        target: 'http://localhost:8000', // 本地服务器的地址和端口
        changeOrigin: true,
      },
      //  '/assets': {
      //   target: 'http://localhost:8000', // 本地服务器的地址和端口
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/assets': '', // 将请求中的 '/api' 替换为空字符串
      //   },
      // },
      '/api/debug/save':{
        target: 'http://localhost:8000', // 本地服务器的地址和端口
        changeOrigin: true,
        pathRewrite: {
          '^/assets': '', // 将请求中的 '/api' 替换为空字符串
        },
      },
      '/assets':{
        target: 'http://localhost:8000', // 本地服务器的地址和端口
        changeOrigin: true,
        
      },
    },
  }
})
