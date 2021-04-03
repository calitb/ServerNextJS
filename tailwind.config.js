module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'terminal-green': 'rgb(128, 255, 128)',
      },
      width: {
        37.5: '9.375rem',
        75: '18.75rem',
      },
      height: {
        55: '13.75rem',
        110: '27.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
