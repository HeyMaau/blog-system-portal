<template>
  <div class="main-page-container">
    <SearchList class="search-list" :searchList="searchResult"/>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "../../plugins/constants";
import SearchList from "../../components/SearchList";

export default {
  name: "index",
  components: {SearchList},
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

.search-list {
  width: 694px;
}

</style>
