/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#F8F5F2',
        nude: '#E4C9B6',
        'baby-blue': '#A2B0CA',
        coffee: '#A26964',
        'baby-green': '#C2D2C7',
        ivory: '#E1DAD3'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}