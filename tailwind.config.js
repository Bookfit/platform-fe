/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
      }, 
      colors: {
        primary: {
          DEFAULT: '#4F46E5',  // 메인 색상
          light: '#F8F8FF',    // 연한 배경색
          dark: '#4338CA',     // 진한 색상
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}