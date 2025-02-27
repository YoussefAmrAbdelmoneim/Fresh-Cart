/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: { screens: {
      xs: '480px', 
      sm: '640px', 
      md: '850px', 
      lg: '1150px', 
      xl: '1440px', 
      '2xl': '1800px', 
    },
  },

  },
  plugins: [ require('flowbite/plugin')],
  darkMode: 'selector'
}

