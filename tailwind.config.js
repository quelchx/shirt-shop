const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        poppin: ['Poppins', 'sans-serif'],
        monaco: ['Monaco', 'sans-serif'],
      },
      // example
      colors: {
        lime: colors.lime,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  content: ['./node_modules/flowbite/**/*.js'],
  plugins: [require('@tailwindcss/forms')],
}
