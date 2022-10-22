/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'ce-green': '#79f268',
                'ce-red': '#a00647',
                'ce-yellow': '#efc28d',
                'ce-orange': '#f1aa9b',
                'ce-purple-300': '#b69bf1',
                'ce-purple-400': '#8680b0',
                'ce-purple-500': '#48426d',
                'ce-purple-700': '#373258',
                'ce-purple-900': '#2d2948',
            },
            fontFamily: {
                title: [
                    '"Roboto Condensed"',
                    'Arial',
                    'ui-sans-serif',
                    'system-ui',
                ],
                text: ['Roboto', 'Arial', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
}
