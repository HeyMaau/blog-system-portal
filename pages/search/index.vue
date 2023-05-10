<template>
  <div class="main-page-container">
    <SearchList class="search-list" :searchList="searchResult"/>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "../../plugins/constants";
import SearchList from "../../components/SearchList";
import {getClientHeight, getScrollHeight, getScrollTop} from "../../plugins/infinite-scroll";

export default {
  name: "index",
  components: {SearchList},
  data() {
    return {
      searchResult: [],
      currentPage: 1,
      currentSize: 6,
      noMore: false
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
        this.noMore = response.data.noMore
      }
    },
    async windowScroll() {
      //如果满足公式则，确实到底了
      if (getScrollTop() + getClientHeight() + 20 >= getScrollHeight()) {
        if (!this.noMore) {
          const keyword = this.$route.query.keyword
          const {data: response} = await this.$axios.get('search', {
            params: {
              keyword: keyword,
              page: ++this.currentPage,
              size: this.currentSize
            }
          })
          if (response.code === CODE_SUCCESS) {
            this.noMore = response.data.noMore
            response.data.data.forEach(item => {
              this.searchResult.push(item)
            })
          }
        }
      }
    }
  },
  created() {
    this.doSearch()
  },
  beforeMount() {
    document.title = `${this.$route.query.keyword} | 搜索结果 - 卧卷`
  },
  mounted() {
    window.addEventListener('scroll', this.windowScroll, true)
  },
  destroyed() {
    window.removeEventListener("scroll", this.windowScroll)
  }
}
</script>

<style scoped>

.search-list {
  width: 694px;
}

</style>
