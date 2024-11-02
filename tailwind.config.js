/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js,jsx,ts,tsx,vue,css}",  // Indica che le classi usate in ogni file con queste estensioni devono essere compilate
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
      },
    },
  },
  plugins: [],
}
