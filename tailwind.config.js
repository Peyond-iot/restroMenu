/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        lg: '1296px', // This should match your design's large screen width
        md: '768',
        xl: '1440px',
        '2xl': '1600px',
      },
    }
  },
  plugins: [],
}

