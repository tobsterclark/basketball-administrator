const colors = require('tailwindcss/colors');
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
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
});
