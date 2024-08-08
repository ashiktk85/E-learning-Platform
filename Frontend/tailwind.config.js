/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        poppins : ["poppins" , 'sans-serif']
      },
      colors: {
        spotify: {
          green: '#1DB954',
          black: '#191414',
          grey: '#282828',
          white: '#FFFFFF',
          lightgrey : "#B3B3B3"
        },
        admin : {
          primary : "#1e1e2c",
          secondary : "#f29f67"
        },
        backgorund: '#f4f5f6',
        tutor : {
          background : '#1fcd9c'
        }

      },
      keyframes: {
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        scrollLeft: 'scrollLeft 40s linear infinite',
      },
      spacing: {
        'item-width': '200px', // Define custom spacing if needed
        'item-height': '100px', // Define custom height if needed
      },
    },
  },
  plugins: [],
}

