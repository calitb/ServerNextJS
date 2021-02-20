module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'terminal-green': 'rgb(128, 255, 128)',
      },
      width: {
        75: '18.75rem',
      },
      height: {
        110: '27.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
