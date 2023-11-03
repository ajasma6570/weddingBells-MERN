/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        kaushan: ['"Kaushan Script"', 'cursive'],
      },
      screens: {
        'xxs': '340px',
        'xs': '480px',  // You can adjust the screen width as needed
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}

