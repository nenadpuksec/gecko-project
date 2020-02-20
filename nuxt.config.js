const bodyParser = require('body-parser')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Open Weather', // process.env.npm_package_name || 
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Open Weather' } //process.env.npm_package_description || ''
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:Black&display=swap' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff', height: '5px', duration: 5000 },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js',
    '~/plugins/vuelidate.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    //'@nuxtjs/bulma'
  ],
  //devModules: ['@nuxtjs/eslint-module'],
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-news-fe8db.firebaseio.com',
    credentials: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-news-fe8db.firebaseio.com',
    fbAPIKey: 'AIzaSyDQUkx4XYuQWAI9fgTDUCWeWuPpQLQVMKE'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  /*router: {
    middleware: 'log'
  }*/
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ]
}
