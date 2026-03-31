/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#fdf9f4',
        forest: {
          50:  '#f2f7f4',
          100: '#e0ede6',
          200: '#c1dace',
          300: '#94bfa7',
          400: '#629e80',
          500: '#3f8162',
          600: '#2d6750',
          700: '#255340',
          800: '#1f4234',
          900: '#1a362c',
          950: '#0f2018',
        },
        pecan: {
          50:  '#faf6f1',
          100: '#f2e8da',
          200: '#e4cfb5',
          300: '#d3ae87',
          400: '#c08c5e',
          500: '#b17240',
          600: '#9a5e35',
          700: '#7e4a2c',
          800: '#673d27',
          900: '#563324',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
