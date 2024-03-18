/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f6ff46',
      },
      boxShadow: {
        'input': '0 5px 5px -1px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
