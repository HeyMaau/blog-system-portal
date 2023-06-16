<template>
  <div>
    <div class="main-page-container" v-if="!loading && searchResult.length > 0">
      <SearchList class="search-list" :searchList="searchResult"/>
    </div>
    <SkeletonView :count="5" :loading="loading" v-if="loading"/>
    <EmptyView class="empty-view" v-if="!loading && searchResult.length === 0" message="暂无搜索结果"/>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "@/plugins/constants";
import SearchList from "../../components/SearchList";
import {getClientHeight, getScrollHeight, getScrollTop} from "@/plugins/infinite-scroll";

export default {
  name: "index",
  components: {SearchList},
  middleware: ['get-categories', 'get-authorInfo'],
  data() {
    return {
      searchResult: [],
      currentPage: 1,
      currentSize: 6,
      noMore: false,
      loading: true,
      hasData: false,
      loadingTimeout: false
    }
  },
  methods: {
    async doSearch() {
      this.loading = true
      this.loadingTimeout = false
      this.hasData = false
      const keyword = this.$route.query.keyword
      const {data: response} = await this.$axios.get('search', {
        params: {
          keyword: keyword,
          page: this.currentPage,
          size: this.currentSize
        }
      })
      this.hasData = true
      if (this.loadingTimeout) {
        this.loading = false
      }
      if (response.code === CODE_SUCCESS) {
        this.searchResult = response.data.data
        this.noMore = response.data.noMore
      } else {
        this.$message.error(response.message)
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
    },
    setLoadingTimeout() {
      setTimeout(() => {
        this.loadingTimeout = true
        if (this.hasData) {
          this.loading = false
        }
      }, 500)
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
    this.setLoadingTimeout()
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

.empty-view {
  margin-top: 50px;
}

</style>
