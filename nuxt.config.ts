import {defineNuxtConfig} from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  compatibilityDate: '2024-04-03',
  routeRules: {
    '/thinking': {ssr: false},
    '/feedback': {ssr: false},
    '/search': {ssr: false},
    '/category/**': {ssr: false}
  },
  app: {
    head: {
      title: '卧卷',
      htmlAttrs: {
        lang: 'zh'
      },
      meta: [
        {charset: 'utf-8'},
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content: '三分开发，七分填坑，卧卷主要分享个人日常开发中遇到的坑。技术学习上可以多卷卷，工作上就不要卷了吧，躺一躺多舒服＠(￣-￣)＠'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'ie=edge,chrome=1'
        },
        {
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
          href: 'https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/viewerjs/1.11.3/viewer.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/highlight.js/11.8.0/styles/androidstudio.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/md-editor-v3@4.21.3/lib/preview.min.css'
        }
      ]
    }
  },
  css: ['@/assets/global.css'],
  modules: ['@element-plus/nuxt', '@pinia/nuxt'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  runtimeConfig: {
    env: '',
    public: {
      serverBaseUrl: '',
      imageBaseUrl: ''
    }
  }
})
