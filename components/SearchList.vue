<template>
  <div class="card">
    <div class="article-item-container" v-for="item in searchList" :key="item.id">
      <div class="article-item">
        <nuxt-link :to="`/article/${item.id}`" target="_blank" class="article-title" v-html="item.title"/>
        <div class="richtext-container">
          <img :src="baseCoverUrl + item.cover" class="article-cover" loading="lazy" v-show="collapseState[item.id]"/>
          <div class="article-content">
            <div class="article-summary" v-show="collapseState[item.id]" v-html="item.content"></div>
            <div v-show="!collapseState[item.id]" v-html="articleContent[item.id]" class="article-detail"></div>
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

export default {
  name: "SearchList",
  props: {searchList: Array},
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
      } else {
        this.$message.error(response.message)
      }
    },
    initCollapseState() {
      if (this.searchList !== undefined) {
        this.searchList.forEach(item => {
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

<style scoped>
@import "~assets/article.css";

::v-deep em {
  color: #f1043c;
  font-style: normal;
}
</style>
