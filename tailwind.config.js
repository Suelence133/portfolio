/** @type {import('tailwindcss').Config} */
// 暖色系主题：配色严格遵循 AGENTS.md 中的色值表
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#FFFBF7', // 页面背景
        section: '#FDF3EA', // 区块背景
        brand: '#E07A5F', // 主色（陶土橙）
        accent: '#F2CC8F', // 辅助色（暖黄）
        ink: '#3D3430', // 正文文字
        muted: '#7A6B62', // 次要文字
        line: '#F0E2D6', // 边框
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        xl: '0.875rem',
      },
      boxShadow: {
        soft: '0 2px 10px rgba(61, 52, 48, 0.06)',
      },
    },
  },
  plugins: [],
};
