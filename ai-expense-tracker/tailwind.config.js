/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'new-astro-light': ['new_astro_light'],
        'new-astro-medium': ['new_astro_medium'],
        'new-astro-bold': ['new_astro_bold'],

        'neue-haas-grotesk-regular': ['neue_haas_grotesk_reguler'],
        'neue-haas-grotesk-medium': ['neue_haas_grotesk_medium'],
        'neue-haas-grotesk-bold': ['neue_haas_grotesk_bold'],
      },
      width: {
        'width-side': '90%',
      },
      colors: {
        'gray-999999': '#999999',
      },
    },
  },
  plugins: [],
};
