module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"]
  },
  theme:{
    screens:{
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend:{},
  },
  variants:{
    extend:{
      animation:['animate-spin']
    }
  }
}