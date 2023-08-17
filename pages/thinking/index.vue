<template>
  <div>
    <ThinkingList class="thinking-list card" :thinkingList="thinkingList" ref="thinkingListRef"
                  v-show="!loading && thinkingList.length > 0">
      <el-pagination
        class="thinking-list-pagination"
        hide-on-single-page
        @current-change="handleCurrentPageChange"
        :page-size="currentSize"
        :pager-count="currentSize"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </ThinkingList>
    <SkeletonView4Thinking class="thinking-list card" :count="5" :loading="true" v-show="loading"/>
    <EmptyView class="empty-view" v-if="!loading && thinkingList.length === 0" message="在写了在写了！！！"/>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "../../plugins/constants";
import ThinkingList from "../../components/ThinkingList";
import SkeletonView4Thinking from "../../components/SkeletonView4Thinking";

export default {
  name: "index",
  components: {ThinkingList, SkeletonView4Thinking},
  middleware: ['get-categories', 'get-authorInfo'],
  data() {
    return {
      thinkingList: [],
      currentPage: 1,
      currentSize: 5,
      total: 0,
      loadingTimeout: false,
      loading: true,
      hasData: false
    }
  },
  methods: {
    async getThinkings() {
      this.loading = true
      this.loadingTimeout = false
      this.hasData = false
      const {data: response} = await this.$axios.get('thinking/list', {
        params: {
          page: this.currentPage,
          size: this.currentSize
        }
      })
      this.hasData = true
      if (this.loadingTimeout) {
        this.loading = false
      }
      if (response.code === CODE_SUCCESS) {
        this.thinkingList = response.data.data
        this.thinkingList.forEach(value => {
          if (value.images !== null && value.images.length !== 0) {
            value.images = this.splitThinkingImages(value.images)
            this.$set(value, 'sliceImages', value.images.slice(0, 4))
          }
        })
        this.total = response.data.total
        this.$refs.thinkingListRef.updatePicViewer()
      }
    },
    splitThinkingImages(imageStr) {
      return imageStr.split('-');
    },
    handleCurrentPageChange(page) {
      this.setLoadingTimeout()
      this.currentPage = page
      this.getThinkings()
      scrollTo(0, 0)
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
    this.getThinkings()
  },
  beforeMount() {
    document.title = '想法 - 卧卷'
  },
  mounted() {
    this.setLoadingTimeout()
  }
}
</script>

<style scoped>

.thinking-list {
  width: 700px;
  margin-top: 10px;
  box-sizing: border-box;
}

.card {
  border-radius: 2px;
  background: white;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
}

.thinking-list-pagination {
  display: flex;
  justify-content: center;
}

</style>
