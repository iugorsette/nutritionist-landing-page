/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E4B1B1',
          dark: '#C99B9B',
          alert: '#FF3D60',
          ok: '#5B7D4A'
        },
        secondary: {
          DEFAULT: '#799D76',
          dark: '#658761'
        }
      },
      fontFamily: {
        script: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
};