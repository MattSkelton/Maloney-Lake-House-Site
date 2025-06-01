/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#82c8fb',
          400: '#43a9f8',
          500: '#1a8df3',
          600: '#096fe7',
          700: '#0958d2',
          800: '#0c49ab',
          900: '#0f3d87',
          950: '#0e2659',
        },
        stone: {
          50: '#f8f8f7',
          100: '#f0efed',
          200: '#e5e4e0',
          300: '#d3d1cb',
          400: '#b7b4ac',
          500: '#9e9a90',
          600: '#857f74',
          700: '#6c675e',
          800: '#595550',
          900: '#484540',
          950: '#292724',
        },
      },
      fontFamily: {
        sans: ['Source Sans 3', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};