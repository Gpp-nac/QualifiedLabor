import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ql-green': '#336633',
        'ql-green-hover': '#3C773C',
        'ql-green-active': '#1D591D',
        'ql-charcoal': '#333333',
        'ql-gold': '#FED700',
        'ql-gray': '#999999',
        'ql-gray-light': '#D6D6D6',
        'ql-gray-bg': '#EEEEEE',
        'ql-link': '#006699',
        'ql-focus': '#4499DD',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
