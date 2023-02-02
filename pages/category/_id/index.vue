<template>
  <div>
    <ArticleList class="article-list" :articleList="articleList"/>
  </div>
</template>

<script>
import ArticleList from "../../../components/ArticleList";
import {CODE_SUCCESS} from "../../../plugins/constants";

export default {
  name: "index",
  components: {ArticleList},
  validate({params}) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      articleList: []
    }
  },
  methods: {
    async getArticleListByCategory() {
      const {data: response} = await this.$axios.get('article/list/' + this.$route.params.id, {
        params: {
          page: 1,
          size: 20
        }
      })
      if (response.code === CODE_SUCCESS) {
        this.articleList = response.data.content
      } else {
        this.$message.error(response.message)
      }
    }
  },
  created() {
    this.getArticleListByCategory()
  }
}
</script>

<style scoped>
@import "~assets/article.css";

</style>
