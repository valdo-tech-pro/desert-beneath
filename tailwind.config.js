/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fbf8f3',
          100: '#f4ecdf',
          200: '#e6d5b8',
          300: '#d4b88a',
          400: '#c19a5f',
          500: '#a87f45',
          600: '#8a6536',
          700: '#6e4f2c',
          800: '#5a4126',
          900: '#4a3622',
        },
        cactus: {
          50: '#f0f7f0',
          100: '#dcecdc',
          200: '#b9d9ba',
          300: '#8dbf8f',
          400: '#5fa163',
          500: '#43844a',
          600: '#356a3b',
          700: '#2c5631',
          800: '#26452a',
          900: '#203a24',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
