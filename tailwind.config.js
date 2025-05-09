module.exports = {
  theme: {
    extend: {
      ringWidth: {
        DEFAULT: '2px',
        6: '6px',
        10: '10px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ['hover', 'active'],
    },
  },
  plugins: [],
}
