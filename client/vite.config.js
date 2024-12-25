import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // 将开发服务器的端口号设置为 3000
  },
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'], // 确保解析 .jsx 文件
  },
});