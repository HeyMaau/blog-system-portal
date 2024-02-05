<template>
  <div class="article-container">
    <img :src="coverUrl" class="article-cover">
    <h1 class="article-title">
      {{ article.title }}
    </h1>
    <AuthorInfoBanner :avatarSrc="avatarUrl" :name="authorInfoData.data.userName"
                      :signature="authorInfoData.data.sign"/>
    <div class="article-main-container">
      <div v-html="article.content" class="article-content" ref="articleContentRef" id="articleContent"></div>
      <div class="article-update-time">编辑于 {{ updateTime }}</div>
      <div class="article-catalog-container" ref="catalogContainerRef">
        <Catalog :headers="headers" :activeHeader="currentHeader" class="article-catalog"/>
      </div>
    </div>
    <ArticleComment/>
  </div>
</template>

<script setup>
import {CODE_SUCCESS, URL_IMAGE} from "~/utils/constants.js";
import AuthorInfoBanner from "~/components/AuthorInfoBanner.vue";
import Catalog from "~/components/Catalog.vue";
import ArticleComment from "~/components/ArticleComment.vue";
import Viewer from "viewerjs"
import {createMetaKeywords, trimArticleContent4Description} from "~/utils/article-util.js";
import hljs from 'highlight.js'
import {RecordEvent, RecordPage} from "~/utils/StatisticsConstants.js";
import {useCommitVisitRecord} from "~/apis/statistics-api.ts";
import {useHead} from "unhead";
import {useAsyncData, useRoute} from "#app";
import {computed, onBeforeUnmount, onMounted, ref, shallowRef} from "vue";
import {getFullArticleApi} from "~/apis/article-api.ts";
import {getAdminInfoApi} from "~/apis/user-api.ts";

const article = shallowRef({})
const description = shallowRef('')
const keywords = shallowRef('')

useHead({
  title: () => `${article.value.title} - 卧卷`,
  meta: () => [
    {
      name: 'description',
      content: description.value
    },
    {
      name: 'keywords',
      content: keywords.value
    }
  ]
})

definePageMeta({
  validate: async (route) => {
    return /^\d+$/.test(route.params.id)
  }
})

let route = useRoute();

const {data: response} = await useAsyncData(`fullArticle_${route.params.id}`, () =>
  getFullArticleApi(route.params.id)
)
if (response.value.code === CODE_SUCCESS) {
  description.value = trimArticleContent4Description(response.value.data.content)
  keywords.value = createMetaKeywords(response.value.data.labels)
  article.value = response.value.data
}

const {data: authorInfoData} = await useAsyncData('authorInfo', () =>
  getAdminInfoApi()
)

let updateTime = computed(() => {
  if (article.value.updateTime !== null && article.value.updateTime !== undefined) {
    let index = article.value.updateTime.lastIndexOf(':');
    return article.value.updateTime.slice(0, index)
  }
})

let avatarUrl = computed(() => {
  return URL_IMAGE.value + authorInfoData.value.data.avatar
})

let coverUrl = computed(() => {
  return URL_IMAGE.value + article.value.cover
})

const headers = ref([])
const headerDoms = ref([])
const currentHeader = ref('')


let articleContentRef = ref()

function extractArticleHeader() {
  let children = articleContentRef.value.children
  for (let i = 0; i < children.length; i++) {
    switch (children[i].tagName) {
      case 'H1':
      case 'H2':
      case 'H3':
        let headerID = 'header-' + i
        let level = children[i].tagName.substring(1, 2)
        children[i].setAttribute('id', headerID)
        headers.value.push({
          id: headerID,
          text: children[i].textContent,
          level
        })
        headerDoms.value.push(children[i])
    }
  }
}

let catalogContainerRef = ref()

function setCatalogHeight() {
  let offsetHeight = articleContentRef.value.offsetHeight;
  catalogContainerRef.value.style.minHeight = offsetHeight + 'px'
}

function trackCatalog() {
  for (let i = 0; i < headerDoms.value.length; i++) {
    let headerDom = headerDoms.value[i]
    if (headerDom.getBoundingClientRect().top - 52 > 10) {
      break
    }
    currentHeader.value = headerDom.getAttribute('id')
  }
}

onMounted(() => {
  extractArticleHeader()
  setCatalogHeight()
  window.addEventListener("scroll", trackCatalog)
  const picViewer = new Viewer(document.getElementById('articleContent'), {
    inline: false,
    title: false,
    toolbar: false,
    transition: false,
    navbar: false
  })
  hljs.highlightAll()
  useCommitVisitRecord(RecordPage.PAGE_NAME_ARTICLE_PAGE + route.params.id, null, RecordEvent.EVENT_NAME_VISIT)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", trackCatalog)
})

</script>

<style scoped>

.article-main-container {
  position: relative;
}

.article-catalog {
  position: sticky;
  top: 62px;
}

.article-catalog-container {
  position: absolute;
  width: 250px;
  top: 16px;
  left: -280px;
}

.article-container {
  width: 700px;
  padding-bottom: 50px;
}

.article-title {
  word-break: break-word;
  font-size: 24px;
  line-height: 1.22;
  font-synthesis: style;
  font-weight: 600;
  margin: 24px 0;
}

.article-content {
  padding-top: 16px;
}

:deep(.article-content img) {
  max-width: 100%;
  cursor: zoom-in;
}

.article-update-time {
  font-size: 14px;
  color: #8590a6;
  padding: 16px 0;
}

.article-cover {
  width: 100%;
  object-fit: cover;
}

:deep(blockquote) {
  border-left: 3px solid #D3D3D3;
  color: #646464;
  padding-left: 1em;
  margin: 1.4em 0;
}

:deep(.article-content a) {
  border-bottom: 1px solid #808080;
}

:deep(.hljs) {
  padding: 10px;
}

</style>
