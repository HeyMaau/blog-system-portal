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
      const {data: response} = await this.$axios.get('article/list', {
        params: {
          page: 1,
          size: 20,
          categoryID: this.$route.params.id
        }
      })
      if (response.code === CODE_SUCCESS) {
        this.articleList = response.data.data
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
