<template>
  <div>
    <div class="main-page-container" v-if="!loading && searchResult.length > 0">
      <SearchList class="search-list" :searchList="searchResult"/>
    </div>
    <SkeletonView :count="5" :loading="loading" v-if="loading"/>
    <EmptyView class="empty-view" v-if="!loading && searchResult.length === 0" message="暂无搜索结果"/>
  </div>
</template>

<script setup>
import {CODE_SUCCESS} from "~/utils/constants.js";
import SearchList from "../components/SearchList.vue";
import {getClientHeight, getScrollHeight, getScrollTop} from "~/utils/infinite-scroll.js";
import {RecordEvent, RecordPage} from "~/utils/StatisticsConstants.js";
import {useCommitVisitRecord} from "~/apis/statistics-api.ts";
import SkeletonView from "../components/SkeletonView.vue";
import EmptyView from "../components/EmptyView.vue";
import {getSearchListApi} from "~/apis/search-api.ts";
import {ElMessage} from "element-plus";
import {onBeforeMount, onMounted, onUnmounted, ref} from "vue";
import {useRoute} from "#app";

const searchResult = ref([])
let currentPage = 1
let currentSize = 6
const noMore = ref(false)
const loading = ref(true)
const hasData = ref(false)
const loadingTimeout = ref(false)

let route = useRoute();

async function doSearch() {
  loading.value = true
  loadingTimeout.value = false
  hasData.value = false
  const keyword = route.query.keyword
  const response = await getSearchListApi({
    keyword: keyword,
    page: currentPage,
    size: currentSize
  })
  hasData.value = true
  if (loadingTimeout.value) {
    loading.value = false
  }
  if (response.code === CODE_SUCCESS) {
    searchResult.value = response.data.data
    noMore.value = response.data.noMore
  } else {
    ElMessage.error(response.message)
  }
}

async function windowScroll() {
  //如果满足公式则，确实到底了
  if (getScrollTop() + getClientHeight() + 20 >= getScrollHeight()) {
    if (!noMore.value) {
      const keyword = route.query.keyword
      const response = await getSearchListApi({
        keyword: keyword,
        page: ++currentPage,
        size: currentSize
      })
      if (response.code === CODE_SUCCESS) {
        noMore.value = response.data.noMore
        response.data.data.forEach(item => {
          searchResult.value.push(item)
        })
      }
    }
  }
}

function setLoadingTimeout() {
  setTimeout(() => {
    loadingTimeout.value = true
    if (hasData.value) {
      loading.value = false
    }
  }, 500)
}

doSearch()

onBeforeMount(() => {
  document.title = `${route.query.keyword} | 搜索结果 - 卧卷`
})

onMounted(() => {
  window.addEventListener('scroll', windowScroll, true)
  setLoadingTimeout()
  useCommitVisitRecord(RecordPage.PAGE_NAME_SEARCH_PAGE, RecordEvent.EVENT_NAME_VISIT)
})

onUnmounted(() => {
  window.removeEventListener("scroll", windowScroll)
})

</script>

<style scoped>

.search-list {
  width: 694px;
  margin-top: 10px;
}

.empty-view {
  margin-top: 50px;
}

</style>
