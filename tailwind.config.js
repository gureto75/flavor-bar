/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vapor: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffc',
          300: '#7cc6fa',
          400: '#36a9f5',
          500: '#0c8ee6',
          600: '#0070c4',
          700: '#01599f',
          800: '#064c83',
          900: '#0a406d',
          950: '#072849',
        },
        smoke: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b0b0b0',
          500: '#8a8a8a',
          600: '#6d6d6d',
          700: '#5a5a5a',
          800: '#3d3d3d',
          900: '#2a2a2a',
          950: '#1a1a1a',
        },
      },
      fontFamily: {
        display: ['Sansation', 'sans-serif'],
        body: ['Sansation', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
