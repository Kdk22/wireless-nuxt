
module.exports = {
  purge: false,
  darkMode: false,
   content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
         screens: {
      'sm': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem'
      }
    },
    fontSize: {
      xsm: '.50rem',
      xm: '.65rem',
      xs: '.75rem',
      sm: '.80rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.375rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    extend: {
      colors: {
        primary: '#ffffff',
        gridcolor: '#15365a',
        primarybuttoncolor: '#47dd84',
        headingtext: '#122667',
        secondarybuttoncolor: '#1877F2',
        darkblue: '#456EFE'
      },
      fontFamily: {
        roboto: ['Roboto'],
        workSans: ['Work Sans'],
        sourceSansPro: ['Source Sans Pro']
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '3/10': '30%'
      },
      borderWidth: {
        default: '1px',
        '1/2': '0.5px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px'
      }

    }
  },
  variants: {
    visibility: ['responsive', 'hover']
  },
  plugins: []
}

