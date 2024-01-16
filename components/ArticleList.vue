<template>
  <div class="card">
    <div class="article-item-container" v-for="item in articleList" :key="item.id">
      <div class="article-item">
        <div class="article-title-tag-container">
          <el-tag size="small" :color="item.category.tagColor" class="article-tag">{{ item.category.name }}
          </el-tag>
          <nuxt-link :to="`/article/${item.id}`" target="_blank" class="article-title">{{ item.title }}</nuxt-link>
        </div>
        <div class="richtext-container">
          <img :src="baseCoverUrl + item.cover" class="article-cover" loading="lazy" v-show="collapseState[item.id]"/>
          <div class="article-content">
            <div class="article-summary" v-show="collapseState[item.id]">
              {{ item.content }}
            </div>
            <div class="article-detail-container" v-show="!collapseState[item.id]">
              <img :src="baseCoverUrl + item.cover" class="article-detail-cover" loading="lazy"/>
              <div v-html="articleContent[item.id]" class="article-detail"
                   :id="`articleDetail_${item.id}`">
              </div>
            </div>
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
import {CODE_SUCCESS} from "~/utils/constants";
import Viewer from "viewerjs"
import hljs from 'highlight.js'
import {getFullArticleApi} from "~/apis/article-api.ts";
import {nextTick, onBeforeUpdate, reactive, shallowRef} from "vue";
import {ElMessage} from "element-plus";
import {ArrowDown} from "@element-plus/icons-vue";

const props = defineProps({
  articleList: Array
})
const articleList = shallowRef(props.articleList)

const articleContent = reactive({})
const collapseState = reactive({})
const baseCoverUrl = import.meta.env.VITE_PUBLIC_IMAGE_BASE_URL


async function showArticleDetail(articleID) {
  const response = await getFullArticleApi(articleID)
  if (response.code === CODE_SUCCESS) {
    articleContent[articleID] = response.data.content
    collapseState[articleID] = false
    await nextTick(() => {
      const picViewer = new Viewer(document.getElementById(`articleDetail_${articleID}`), {
        inline: false,
        title: false,
        toolbar: false,
        transition: false,
        navbar: false
      })
      hljs.highlightAll()
    })
  } else {
    ElMessage.error(response.message)
  }
}

function initCollapseState() {
  if (articleList.value !== undefined) {
    articleList.value.forEach(item => {
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

:deep(blockquote) {
  border-left: 3px solid #D3D3D3;
  color: #646464;
  padding-left: 1em;
  margin: 1.4em 0;
}

:deep(.article-detail a) {
  border-bottom: 1px solid #808080;
}

:deep(.hljs) {
  padding: 10px;
}

.article-tag {
  margin-right: 4px;
  transform: translate(0, -10%);
  border: none;
  color: white;
  font-weight: bold;
}

</style>
