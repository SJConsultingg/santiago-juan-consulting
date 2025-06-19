/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Safelist para clases críticas que podrían ser generadas dinámicamente
  safelist: [
    'text-primary',
    'text-secondary',
    'text-accent',
    'bg-primary',
    'bg-secondary', 
    'bg-accent',
    'from-primary',
    'to-primary',
    'from-secondary',
    'to-secondary',
    'from-accent',
    'to-accent',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#74C1BF',    // Teal claro
        secondary: '#0B3C49',  // Azul petróleo
        accent: '#F4A261',     // Naranja suave
        background: '#F5F5F5', // Fondo
        text: '#333333',       // Texto
      },
      animation: {
        'scroll': 'scroll 2s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scroll: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  // Desactivar cosas que no usamos para reducir el tamaño
  corePlugins: {
    tableLayout: false,
    placeholderColor: false,
    placeholderOpacity: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    boxDecorationBreak: false,
    filter: false,
    backdropFilter: false,
    mixBlendMode: false,
    backgroundBlendMode: false,
  },
  plugins: [],
  // Optimizaciones para reducir el tamaño del bundle
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
} 