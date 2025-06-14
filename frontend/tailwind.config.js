export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main: 'var(--main)',
        sub1: 'var(--sub1)',
        surface: 'var(--surface)',
        gray: 'var(--gray)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
