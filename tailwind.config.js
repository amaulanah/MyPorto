/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Humanist & classic system fonts (Calibri / Arial / Segoe UI)
        sans: ['Calibri', 'Candara', '"Segoe UI"', 'Arial', 'sans-serif'],
        arial: ['Arial', '"Helvetica Neue"', 'Helvetica', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['Consolas', '"Courier New"', 'Courier', 'monospace'],
      },
      colors: {
        // Natural ink & earth tones
        ink: {
          900: '#171717',
          800: '#262626',
          700: '#404040',
          600: '#525252',
          500: '#737373',
          400: '#a3a3a3',
          300: '#d4d4d4',
          200: '#e5e5e5',
          100: '#f5f5f4',
          50: '#fafaf9',
        },
        // Handcrafted earth accent (warm rust / terracotta)
        accent: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0a999',
          400: '#d3755b',
          500: '#c2410c', // Terracotta / rust
          600: '#9a3412',
          700: '#7c2d12',
          800: '#602410',
          900: '#431b0c',
        }
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'wide-editorial': '0.08em',
      }
    },
  },
  plugins: [],
}
