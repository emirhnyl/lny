/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F5C10E',
          50: '#FEF9E7',
          100: '#FEF3CF',
          200: '#FCE69F',
          300: '#FBDA6F',
          400: '#F9CD3F',
          500: '#F5C10E',
          600: '#E0AD0A',
          700: '#B88B08',
          800: '#8F6906',
          900: '#674704',
        },
        dark: {
          DEFAULT: '#111111',
          50: '#1A1A1A',
          100: '#171717',
          200: '#141414',
          300: '#111111',
          400: '#0E0E0E',
          500: '#0B0B0B',
          600: '#080808',
          700: '#050505',
          800: '#020202',
          900: '#000000',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'lightning': 'lightning 0.3s ease-in-out infinite alternate',
        'draw-line': 'drawLine 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px #F5C10E)' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 16px #F5C10E)' },
        },
        lightning: {
          '0%': { filter: 'drop-shadow(0 0 5px #F5C10E)' },
          '100%': { filter: 'drop-shadow(0 0 20px #F5C10E) drop-shadow(0 0 30px #F5C10E)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      cursor: {
        none: 'none',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
