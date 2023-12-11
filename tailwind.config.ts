import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'infoVideo': '#767676',
        'midnight': '#14181d',
        'timeVideo': '#c6c6c6',
        'bgTimeVideo': '#1b1b1b',
        'bgBody': '#14181d',
        'dessous': '#969696',
        'bermuda': '#78dcca',
      },
      screens: {
        'hd': '1150px',
      }
    },
  },
  plugins: [],
}
export default config
