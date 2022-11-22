/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'al-massira-blue': '#39CCFB',
                'accent-one': '#FF7070',
                green: colors.emerald,
                yellow: colors.amber,
            },
        },
    },
    plugins: [],
}