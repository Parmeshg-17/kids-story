/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
      },
      colors: {
        kids: {
          primary: '#FF6B9D',
          secondary: '#C084FC',
          accent: '#34D399',
          bg: '#FFF0F9',
        },
        horror: {
          primary: '#EF4444',
          secondary: '#7F1D1D',
          accent: '#F97316',
          bg: '#0C0A09',
        },
        moral: {
          primary: '#F59E0B',
          secondary: '#92400E',
          accent: '#10B981',
          bg: '#FFFBEB',
        },
        royal: {
          primary: '#7C3AED',
          secondary: '#4C1D95',
          accent: '#F59E0B',
          bg: '#F5F3FF',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'gradient': 'gradientShift 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
