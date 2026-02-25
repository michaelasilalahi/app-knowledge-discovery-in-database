/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/features/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'new-astro-light': ['new_astro_light'],
        'new-astro-medium': ['new_astro_medium'],
        'new-astro-bold': ['new_astro_bold'],
        'montserrat-thin': ['montserrat_thin'],
        'montserrat-semibold': ['montserrat_semibold'],
        'montserrat-regular': ['montserrat_regular'],
        'montserrat-medium': ['montserrat_medium'],
        'montserrat-light': ['montserrat_light'],
        'montserrat-extralight': ['montserrat_extralight'],
        'montserrat-extrabold': ['montserrat_extrabold'],
        'montserrat-bold': ['montserrat_bold'],
        'montserrat-black': ['montserrat_black'],
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
