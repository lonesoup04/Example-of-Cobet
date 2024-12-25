/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 确保所有可能使用 Tailwind 的文件都被包含
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
