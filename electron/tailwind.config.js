const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
    theme: {
        extend: {
            colors: {
                sky: colors.sky,
                cyan: colors.cyan,
                nsbl_primary: 'rgb(236, 113, 36)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
