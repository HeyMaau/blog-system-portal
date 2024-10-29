<template>
  <div class="card">
    <div class="article-item-container" v-for="item in searchList" :key="item.id">
      <div class="article-item">
        <nuxt-link :to="`/article/${item.id}`" target="_blank" class="article-title" v-html="item.title"/>
        <div class="richtext-container">
          <img :src="item.cover" class="article-cover" loading="lazy" v-show="collapseState[item.id]"/>
          <div class="article-content">
            <div class="article-summary" v-show="collapseState[item.id]" v-html="item.content"></div>
            <div v-show="!collapseState[item.id]" v-html="articleContent[item.id]" class="article-detail"></div>
            <button class="show-article-detail" @click="showArticleDetail(item.id)"
                    v-show="collapseState[item.id]">
              阅读全文
              <el-icon class="arrow-down-icon">
                <ArrowDown/>
              </el-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import {CODE_SUCCESS, URL_IMAGE} from "~/utils/constants";
import {getFullArticleApi} from "~/apis/article-api.ts";
import {onBeforeUpdate, reactive} from "vue";
import {ElMessage} from "element-plus";
import {ArrowDown} from "@element-plus/icons-vue";

const props = defineProps({
  searchList: Array
})

const articleContent = reactive({})
const collapseState = reactive({})

async function showArticleDetail(articleID) {
  const response = await getFullArticleApi(articleID)
  if (response.code === CODE_SUCCESS) {
    articleContent[articleID] = response.data.content
    collapseState[articleID] = false
  } else {
    ElMessage.error(response.message)
  }
}

function initCollapseState() {
  if (props.searchList !== undefined) {
    props.searchList.forEach(item => {
      if (collapseState[item.id] === undefined) {
        collapseState[item.id] = true
      }
    })
  }
}

onBeforeUpdate(() => {
  initCollapseState()
})

initCollapseState()

</script>

<style src="@/assets/article.css" scoped/>
<style scoped>

:deep(em) {
  color: #f1043c;
  font-style: normal;
}
</style>
