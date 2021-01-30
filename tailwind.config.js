module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'terminal-green': 'rgb(128, 255, 128)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
