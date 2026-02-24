/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                themorning: {
                    red: '#dc2626',
                    dark: '#111827',
                    gray: '#f9fafb',
                    border: '#e5e7eb'
                }
            },
            fontFamily: {
                serif: ['Merriweather', 'Georgia', 'serif'],
                sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
