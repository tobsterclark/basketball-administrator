const colors = require('tailwindcss/colors');

module.exports = {
<<<<<<< HEAD
    content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                sky: colors.sky,
                cyan: colors.cyan,
            },
        },
=======
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
>>>>>>> main
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
