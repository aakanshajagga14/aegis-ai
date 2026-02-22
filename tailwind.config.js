/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0D0D0D',
                lose: '#C0392B',
                unclear: '#D4860A',
                safe: '#27AE60',
                brand: {
                    light: '#F5F5F5',
                    muted: '#808080',
                    dark: '#1A1A1A',
                }
            },
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
            },
        },
    },
    plugins: [],
}
