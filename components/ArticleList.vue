<template>
  <div id="article-list" class="card">
    <div class="article-item-container" v-for="item in articleList" :key="item.id">
      <div class="article-item">
        <nuxt-link :to="`/article/${item.id}`" target="_blank" class="article-title">{{ item.title }}</nuxt-link>
        <div class="richtext-container">
          <img src="~/static/test.jpg" class="article-cover" loading="lazy" v-show="collapseState[item.id]"/>
          <div class="article-content">
            <div class="article-summary" v-show="collapseState[item.id]">
              {{ item.content }}
            </div>
            <div v-show="!collapseState[item.id]" v-html="articleContent[item.id]" class="article-detail">
            </div>
            <button class="show-article-detail" @click="showArticleDetail(item.id, $event)"
                    v-show="collapseState[item.id]">
              阅读全文
              <i class="el-icon-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "@/plugins/constants";

export default {
  name: "ArticleList",
  props: {articleList: Array},
  data() {
    return {
      articleContent: {},
      collapseState: {}
    }
  },
  methods: {
    async showArticleDetail(articleID, $event) {
      const {data: response} = await this.$axios.get('article/' + articleID)
      if (response.code === CODE_SUCCESS) {
        this.$set(this.articleContent, articleID, response.data.content)
        this.collapseState[articleID] = false
      } else {
        this.$message.error(response.message)
      }
      console.log(articleID, $event)
    },
    initCollapseState() {
      if (this.articleList !== undefined) {
        this.articleList.forEach(item => {
          this.$set(this.collapseState, item.id, true)
        })
      }
    }
  },
  beforeMount() {
    this.initCollapseState()
  }
}
</script>

<style scoped>

.article-title {
  margin: 0;
  line-height: 1.6;
  font-size: 18px;
  font-weight: 600;
  font-synthesis: style;
  color: #121212;
}

.article-cover {
  width: 190px;
  height: 105px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 18px;
  border-radius: 4px;
}

.richtext-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
}

.article-item {

}

.article-item-container {
  padding: 20px;
  border-bottom: 1px solid #f0f2f7;
  box-shadow: none;
}

.article-summary {
  max-height: 100px;
  line-height: 1.67;
  overflow: hidden;
  display: inline;
}

.card {
  border-radius: 2px;
  background: white;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
}

.show-article-detail {
  color: #175199;
  margin-left: 4px;
  border: none;
  background-color: transparent;
  font-size: 15px;
  cursor: pointer;
  padding: 0;
}

.el-icon-arrow-down {
  font-weight: bold;
}

.article-content {
  width: 100%;
}

::v-deep .article-detail img {
  max-width: 100%;
}
</style>
