const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Color pallete
      // https://coolors.co/palette/0081a7-00afb9-fdfcdc-fed9b7-f07167
      colors: {
        primary: '#F07167',
        secondary: '#0081A7',
        dark: '#363537',
        gray: '#F4F6F6',
        peach: '#FED9B7',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
