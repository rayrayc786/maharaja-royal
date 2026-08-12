/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#0A1930',
        'gold': '#D4AF37',
        'gold-light': '#e4c87c',
        'cream': '#F4F0E8',
        'dark': '#081121',
        'burgundy': '#7B2D3B',
        'text-dark': '#1D1D1B',
        'text-light': '#E9E2D6',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },
      fontSize: {
        'huge': 'clamp(60px, 10vw, 160px)',
        'large': 'clamp(40px, 6vw, 100px)',
      },
      keyframes: {
        growLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '50.1%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        fadeIn: {
          to: { opacity: '1' },
        },
      },
      animation: {
        'grow-line': 'growLine 2s infinite ease-in-out',
        'fade-in': 'fadeIn 1s forwards',
      },
    },
  },
  plugins: [],
}
