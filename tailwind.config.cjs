/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        error: colors.red['500'],
        accent: {
          DEFAULT: '#39CCFB',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
