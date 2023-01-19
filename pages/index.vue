<template>
  <div id="main-page-container">
    <div id="article-list">
      <div class="article-item-container" v-for="item in articleList" :key="item.id">
        <div class="article-item">
          <h2 class="article-title">{{ item.title }}</h2>
          <div class="richtext-container">
            <img src="~/static/test.jpg" class="article-cover" loading="lazy"/>
            <div class="article-summary">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <div class="article-item-container">
        <div class="article-item">
          <h2 class="article-title">很长很长很长的标题</h2>
          <div class="richtext-container">
            <img src="~/static/test.jpg" class="article-cover"/>
            <div class="article-summary">相对于v-slot指令，对大家来说都应该不是很陌生，在 2.6.0 中，vue为具名插槽和作用域插槽引入了一个新的统一的语法 (即
              v-slot指令)。它取代了 slot 和 slot-scope在新版中的应用，当然vue官方暂时还木有删除老版本中具名插槽
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ARTICLE_SUMMARY_LENGTH} from "../plugins/constants";

export default {
  name: 'IndexPage',
  data() {
    return {
      test: '哈哈'
    }
  },
  methods: {
    trimArticleSummary() {
      this.articleList.forEach(item => {
        if (item.content.length > ARTICLE_SUMMARY_LENGTH) {
          item.content = item.content.slice(0, ARTICLE_SUMMARY_LENGTH) + '...'
        }
      })
    }
  },
  async asyncData({$axios}) {
    const {data: response} = await $axios.get('article/list', {
      params: {
        page: 1,
        size: 20
      }
    })
    return {
      articleList: response.data.data
    }
  },
  mounted() {
    this.trimArticleSummary()
  }
}
</script>

<style scoped>

#main-page-container {
  display: flex;
  justify-content: center;
  width: 1000px;
}

#article-list {
  width: 694px;
  background-color: white;
  border-radius: 2px;
}

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
  padding: 15px;
  border-bottom: 1px solid #f0f2f7;
  box-shadow: none;
}

.article-summary {
  max-height: 100px;
  line-height: 1.67;
  overflow: hidden;
}

</style>
