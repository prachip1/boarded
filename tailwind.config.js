/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white':"#ffffff",
        'myblue': "#0F0417",
        'mytextwhite':"#f0e9f5",
        'hoverblue':"#1a0529",
        'linkcolor':"#7979dd",
        'modalbg':"rgba(0,0,0,0.5)"

      },
      fontFamily: {
        raleway: ["Raleway","sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
    
     
      },
      backgroundImage:{
        'hero-pattern':"url('/coverbo.png')",
      },
    },
   
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"],
  },
  plugins: [require('daisyui'),],
}

