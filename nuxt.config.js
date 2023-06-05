import env from './env'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '首页 - 卧卷',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/router',
    '@/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: env[process.env.NODE_ENV].URL_SERVER + '/portal/',
    timeout: 5000
  },

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    babel: {
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        minSize: 10000,
        maxSize: 250000,
        name: undefined,
        cacheGroups: {}
      }
    }
  }
}
