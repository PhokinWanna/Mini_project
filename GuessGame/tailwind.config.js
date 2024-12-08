/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        border: '#ccc', // Define a custom border color.
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        concert: ['Concert One', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
