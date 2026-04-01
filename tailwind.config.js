/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          400: '#2dd4bf',
          500: '#0f766e',
          600: '#115e59',
          700: '#134e4a'
        }
      },
      boxShadow: {
        soft: '0 20px 45px -30px rgba(15, 23, 42, 0.45)'
      }
    },
  },
  plugins: [],
}

