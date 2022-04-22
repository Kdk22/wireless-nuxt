export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { content: process.env.npm_package_description || ''}
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [ '~/plugins/axios.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
  // middleware: ['auth']
},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.ENV}` }],
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  auth: {
    strategies: {

      // local: {
      //   _scheme: 'oauth2',
      //   authorization_endpoint: 'http://127.0.0.1:8000/token-auth/',
      //   userinfo_endpoint: false,
      //   access_type: 'offline',
      //   access_token_endpoint: 'http://127.0.0.1:8000/detail/me/',
      //   response_type: 'code',
      //   token_type: 'Bearer',
      //   token_key: 'access_token',
      // },
      local: {
        scheme: 'refresh',
        token:
          {
              property: 'access_token',
              required: true,
              maxAge: 1800,
              global: true,
              type: 'Bearer'
           },
        user:
          {
            property: false, // <--- Default "user"
            autoFetch: true
          },
        refreshToken:
          {
            property: 'refresh_token',
            data: 'refresh_token',
            maxAge: 60 * 60 * 24 * 30
          },


        endpoints:
          {
            login:
              {
                url: 'api/token/',
                method: 'post',
                propertyName: false
              },
            user:
              {
                url: 'users-detail/me/',
                method: 'get',
                propertyName: false
            },
            refresh: { url: 'api/token/refresh',
              method: 'post' },
            logout: false
        },
      }
    },
    redirect: {
      login: '/login/',
      logout: '/login/',
      callback: '/login',
      home: '/login/'
    },
    rewriteRedirects: false,
    fullPathRedirect: false,
    localStorage: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308

  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
