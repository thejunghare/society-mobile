/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'society-green': '#3EB489',
        'society-offwhite': '#f2f2f2'
      }
    },
  },
  plugins: [],
}

