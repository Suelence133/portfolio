import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 配置：React 插件 + 默认构建输出到 dist
export default defineConfig({
  plugins: [react()],
});
