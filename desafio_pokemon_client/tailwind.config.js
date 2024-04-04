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

        grass: '#78c850' ,
        fire: '#f05030' ,
        water: '#6890f0' ,
        ground: '#e0c068' ,
        flying: '#a890f0' ,
        electric: '#f8d030' ,
        normal: '#a8a878' ,
        fighting: '#903028' ,
        psychic: '#f85888' ,
        rock: '#b8a038' ,
        ice: '#98d8d8' ,
        bug: '#a8b820' ,
        ghost: '#705898' ,
        dragon: '#7038f8' ,
        dark: '#705848' ,
        steel: '#b8b8d0' ,
        poison: '#a040a0' ,
        fairy: '#ffc3d0' ,
      },
      boxShadow: {
        'input': '0 5px 5px -1px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
