import {defineNuxtConfig} from "nuxt/config";
import externalGlobals from "rollup-plugin-external-globals";
import type {ViteConfig} from "@nuxt/schema";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
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
          href: 'https://cdn.jsdelivr.net/npm/element-plus@2.4.4/dist/index.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/viewerjs@1.11.3/dist/viewer.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.8.0/styles/androidstudio.min.css'
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/vue@3.3.13/dist/vue.global.prod.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/vue-router@4.2.5/dist/vue-router.global.prod.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/element-plus@2.4.4/dist/index.full.min.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2.3.1/dist/index.iife.min.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/viewerjs@1.11.3/dist/viewer.min.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.8.0/highlight.min.js'
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
  },
  hooks: {
    "vite:extendConfig": setViteConfig
  }
})

function setViteConfig(viteInlineConfig: ViteConfig, env: {
  isClient: boolean;
  isServer: boolean;
}) {
  if (env.isClient) {
    viteInlineConfig.build!.rollupOptions!.external = ['highlight.js', 'viewerjs']
    viteInlineConfig.build!.rollupOptions!.plugins = [
      externalGlobals({
        'highlight.js': 'hljs',
        'viewerjs': 'Viewer',
        'element-plus': 'ElementPlus',
        '@element-plus/icons-vue': 'ElementPlusIconsVue'
      })
    ]
  }
}
