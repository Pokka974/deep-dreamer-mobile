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
                custom: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
