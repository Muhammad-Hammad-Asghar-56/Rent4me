/** @type {import('tailwindcss').Config} */
export default {
  darkMode: '',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        orange: '#fe793e',
        navy: '#212d45',
        black: '#191919',
        white: '#ffffff'
      },
    },
  },
  plugins: [],
}
