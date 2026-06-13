/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8e9',
          100: '#fbeec6',
          200: '#f6dd8d',
          300: '#f0c94f',
          400: '#e9b426',
          500: '#d4a017',
          600: '#b8860b',
          700: '#946809',
          800: '#7a5709',
          900: '#5c420a',
        },
        charcoal: {
          50: '#f6f6f7',
          100: '#e1e2e5',
          200: '#c3c5cb',
          300: '#9a9ea8',
          400: '#6b707d',
          500: '#4a4f5c',
          600: '#363a44',
          700: '#26282f',
          800: '#1a1c21',
          900: '#0f1014',
          950: '#08090b',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f0c94f 0%, #d4a017 50%, #b8860b 100%)',
      },
    },
  },
  plugins: [],
};
