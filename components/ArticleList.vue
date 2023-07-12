<template>
  <div class="card">
    <div class="article-item-container" v-for="item in articleList" :key="item.id">
      <div class="article-item">
        <nuxt-link :to="`/article/${item.id}`" target="_blank" class="article-title">{{ item.title }}</nuxt-link>
        <div class="richtext-container">
          <img :src="baseCoverUrl + item.cover" class="article-cover" loading="lazy" v-show="collapseState[item.id]"/>
          <div class="article-content">
            <div class="article-summary" v-show="collapseState[item.id]">
              {{ item.content }}
            </div>
            <div v-show="!collapseState[item.id]" v-html="articleContent[item.id]" class="article-detail"
                 :id="`articleDetail_${item.id}`">
            </div>
            <button class="show-article-detail" @click="showArticleDetail(item.id)"
                    v-show="collapseState[item.id]">
              阅读全文
              <i class="el-icon-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import {CODE_SUCCESS, URL_IMAGE} from "@/plugins/constants";
import Viewer from "viewerjs"
import hljs from 'highlight.js'

export default {
  name: "ArticleList",
  props: {articleList: Array},
  data() {
    return {
      articleContent: {},
      collapseState: {},
      baseCoverUrl: URL_IMAGE
    }
  },
  methods: {
    async showArticleDetail(articleID) {
      const {data: response} = await this.$axios.get('article/' + articleID)
      if (response.code === CODE_SUCCESS) {
        this.$set(this.articleContent, articleID, response.data.content)
        this.collapseState[articleID] = false
        this.$nextTick(() => {
          const picViewer = new Viewer(document.getElementById(`articleDetail_${articleID}`), {
            inline: false,
            title: false,
            toolbar: false,
            transition: false,
            navbar: false
          })
          hljs.highlightAll()
        })
      } else {
        this.$message.error(response.message)
      }
    },
    initCollapseState() {
      if (this.articleList !== undefined) {
        this.articleList.forEach(item => {
          if (this.collapseState[item.id] === undefined) {
            this.$set(this.collapseState, item.id, true)
          }
        })
      }
    }
  },
  beforeUpdate() {
    this.initCollapseState()
  },
  created() {
    this.initCollapseState()
  }
}
</script>

<style src="@/assets/article.css" scoped/>
<style scoped>

::v-deep blockquote {
  border-left: 3px solid #D3D3D3;
  color: #646464;
  padding-left: 1em;
  margin: 1.4em 0;
}

::v-deep .article-detail a {
  border-bottom: 1px solid #808080;
}

::v-deep .hljs {
  padding: 10px;
}

</style>
