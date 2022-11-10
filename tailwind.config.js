/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/components/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {

            fontFamily: {
                sans: 'Inter, sans serif'
            },

            colors: {

                yellow: {
                    500: "#f7dd43",
                    700: '#FF800C'
                },
                gray: {
                    100: '#e1e1e6',
                    300: '#8d8d99',
                    600: '#323238',
                    800: '#202024',
                    900: '#141414'
                }
            },

            height: {
                15: 60,
                68: 272
            },

            screens: {
                'sm': { 'max': '400px' },
                '2xl': { 'max': '1535px' },
                'xl': { 'max': '1200px' },
                'lg': { 'max': '1023px' },
                'md': { 'max': '767px' },
            },
        },

    },
    plugins: [],
}