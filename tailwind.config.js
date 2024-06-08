/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryRedHex: '#DC3535',
        primaryOrangeHex: '#D17842',
        primaryBlackHex: '#0C0F14',
        primaryDarkGreyHex: '#141921',
        secondaryDarkGreyHex: '#21262E',
        primaryGreyHex: '#252A32',
        secondaryGreyHex: '#252A32',
        primaryLightGreyHex: '#52555A',
        secondaryLightGreyHex: '#AEAEAE',
        primaryWhiteHex: '#FFFFFF',
        primaryBlackRGBA: 'rgba(12,15,20,0.5)',
        secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
      },
      fontFamily: {
        poppins_black: 'Poppins-Black',
        poppins_bold: 'Poppins-Bold',
        poppins_extrabold: 'Poppins-ExtraBold',
        poppins_extralight: 'Poppins-ExtraLight',
        poppins_light: 'Poppins-Light',
        poppins_medium: 'Poppins-Medium',
        poppins_regular: 'Poppins-Regular',
        poppins_semibold: 'Poppins-SemiBold',
        poppins_thin: 'Poppins-Thin',
      },
    },
  },
  plugins: [],
};

