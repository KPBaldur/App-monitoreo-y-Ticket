/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f766e', // Teal 700
                    dark: '#0d9488', // Teal 600
                },
                status: {
                    green: '#22c55e',
                    orange: '#f97316',
                    red: '#ef4444',
                },
                corporate: {
                    primary: '#2e5d67', // Dark Teal from logo
                    accent: '#1d9397',  // Bright Teal
                    bg: '#dadfe2',      // Light Blue/Grey from image
                    light: '#ecf2f5',   // Lighter version for main bg
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
