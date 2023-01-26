/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
  './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        'defaultMainBg': '#444654',
        'defaultText': '#cfcfcf',
        'defaultTitle': '#ff3131',
        'defaultSubtitle': '#db2525',
        'defaultHeader': '#343541'
      }
    },
  },
  plugins: [],
}
