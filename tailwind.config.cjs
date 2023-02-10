/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#0a192f',
        grayish: '#6d6d6eb3',
        hoverGray: '#cbd5e1',
        darkGray: '#404042b3',
      }
    },
  },
  plugins: [],
}
