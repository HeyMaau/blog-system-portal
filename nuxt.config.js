import env from './env'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '卧卷',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: '三分开发，七分填坑，卧卷主要分享个人日常开发中遇到的坑。技术学习上可以多卷卷，工作上就不要卷了吧，躺一躺多舒服＠(￣-￣)＠'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'ie=edge,chrome=1'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '卧卷,Android,前端,后端'
      },
      {
        name: 'renderer',
        content: 'webkit'
      },
      {
        name: 'force-rendering',
        content: 'webkit'
      },
      {name: 'format-detection', content: 'telephone=no,email=no,adress=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/viewerjs@1.11.3/dist/viewer.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/@highlightjs/cdn-assets@11.8.0/styles/androidstudio.min.css'
      }
    ],
    script: [
      {
        src: 'https://unpkg.com/vue@2.7.10/dist/vue.min.js'
      },
      {
        src: 'https://unpkg.com/viewerjs@1.11.3/dist/viewer.min.js'
      },
      {
        src: 'https://unpkg.com/@highlightjs/cdn-assets@11.8.0/highlight.min.js'
      }
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
    extend(config, {isClient}) {
      if (isClient) {
        config.externals = {
          'viewerjs': 'Viewer',
          'vue': 'Vue',
          'highlight.js': 'hljs'
        }
      }
    }
  }
}
