module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black' : '#333333',
        'custom-pink': '#FF5194',
        'custom-purple': '#6551FF',
        'custom-orange': '#FFAD2B',
        'custom-sky': '#00D8F8',
        'custom-succes': '#6DBF2A',
        'custom-danger' : '#FF543A'
      }
    }
  },
  plugins: [],
}