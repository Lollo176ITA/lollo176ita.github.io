/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    }
  },
  // Riduce il CSS generato rimuovendo utility mai usate
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: []
};

