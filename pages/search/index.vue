<template>
  <div class="main-page-container">
    <ArticleList class="article-list" :articleList="searchResult"/>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "../../plugins/constants";

export default {
  name: "index",
  data() {
    return {
      searchResult: [],
      currentPage: 1,
      currentSize: 10
    }
  },
  methods: {
    async doSearch() {
      const keyword = this.$route.query.keyword
      const {data: response} = await this.$axios.get('search', {
        params: {
          keyword: keyword,
          page: this.currentPage,
          size: this.currentSize
        }
      })
      if (response.code === CODE_SUCCESS) {
        this.searchResult = response.data.data
      }
    }
  },
  created() {
    this.doSearch()
  }
}
</script>

<style scoped>

</style>
