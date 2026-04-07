import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ota: {
          green: '#4A7C59',
          'green-dark': '#2D5A3D',
          'green-light': '#E8F5E9',
          warm: '#A53D2C',
          beige: '#FFF8F0',
          'beige-dark': '#F5E6D3',
          cream: '#FFFAF5',
          coral: '#FC9999',
          dark: '#1A2E1A',
          text: '#2D3436',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ota-gradient': 'linear-gradient(135deg, #4A7C59, #2D5A3D)',
        'ota-gradient-warm': 'linear-gradient(135deg, #A53D2C, #4A7C59)',
      },
    },
  },
  plugins: [],
};

export default config;
