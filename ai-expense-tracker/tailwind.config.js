/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'new-astro': ['new_astro'],
        'neue-haas-grotesk': ['neue_haas_grotesk'],
      },
      width: {
        'width-side': '90%'
      },
      colors: {
        'gray-999999': '#999999',
      }
    },
  },
  plugins: [],
}