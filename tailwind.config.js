/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './src/screens/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ff6290',
                dark: '#00083e',
                secondary: '#3F5E9A',
                accent: '#88B1E1',
                light: '#F4F5F7',
            },
            fontFamily: {
                custom: ['Quick-Kiss', 'sans-serif'],
                quicksand: ['Quicksand', 'sans-serif'],
                quicksandBold: ['QuicksandBold', 'sans-serif'],
                quicksandMedium: ['QuicksandMedium', 'sans-serif'],
                quicksandSemiBold: ['QuicksandSemiBold', 'sans-serif'],
                quicksandLight: ['QuicksandLight', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
