<template>
  <div class="article-container">
    <img :src="coverUrl" class="article-cover">
    <h1 class="article-title">
      {{ article.title }}
    </h1>
    <AuthorInfoBanner :avatarSrc="avatarUrl" :name="authorInfo.userName" :signature="authorInfo.sign"/>
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

<script>
import {CODE_SUCCESS, URL_IMAGE} from "@/plugins/constants";
import AuthorInfoBanner from "@/components/AuthorInfoBanner";
import {mapState} from "vuex";
import Catalog from "@/components/Catalog";
import ArticleComment from "@/components/ArticleComment";
import Viewer from "viewerjs"
import 'viewerjs/dist/viewer.min.css'

export default {
  name: "index",
  middleware: ['get-categories', 'get-authorInfo'],
  components: {ArticleComment, AuthorInfoBanner, Catalog},
  validate({params}) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({$axios, params}) {
    const {data: response} = await $axios.get('article/' + params.id)
    if (response.code === CODE_SUCCESS) {
      return {article: response.data}
    }
  },
  computed: {
    ...mapState('authorInfo', ['authorInfo']),
    updateTime() {
      let index = this.article.updateTime.lastIndexOf(':');
      return this.article.updateTime.slice(0, index)
    },
    avatarUrl() {
      return URL_IMAGE + this.authorInfo.avatar
    },
    coverUrl() {
      return URL_IMAGE + this.article.cover
    }
  },
  data() {
    return {
      headers: [],
      headerDoms: [],
      currentHeader: ''
    }
  },
  methods: {
    extractArticleHeader() {
      let children = this.$refs.articleContentRef.children
      for (let i = 0; i < children.length; i++) {
        switch (children[i].tagName) {
          case 'H1':
          case 'H2':
          case 'H3':
            let headerID = 'header-' + i
            let level = children[i].tagName.substring(1, 2)
            children[i].setAttribute('id', headerID)
            this.headers.push({
              id: headerID,
              text: children[i].textContent,
              level
            })
            this.headerDoms.push(children[i])
        }
      }
    },
    setCatalogHeight() {
      let offsetHeight = this.$refs.articleContentRef.offsetHeight;
      this.$refs.catalogContainerRef.style.minHeight = offsetHeight + 'px'
    },
    trackCatalog() {
      for (let i = 0; i < this.headerDoms.length; i++) {
        let headerDom = this.headerDoms[i]
        if (headerDom.getBoundingClientRect().top - 52 > 10) {
          break
        }
        this.currentHeader = headerDom.getAttribute('id')
      }
    }
  },
  mounted() {
    this.extractArticleHeader()
    this.setCatalogHeight()
    window.addEventListener("scroll", this.trackCatalog)
    const picViewer = new Viewer(document.getElementById('articleContent'), {
      inline: false,
      title: false,
      toolbar: false,
      transition: false,
      navbar: false
    })
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.trackCatalog)
  },
  beforeMount() {
    document.title = `${this.article.title} - 卧卷`
  }
}
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

::v-deep .article-content img {
  max-width: 100%;
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

::v-deep blockquote {
  border-left: 3px solid #D3D3D3;
  color: #646464;
  padding-left: 1em;
  margin: 1.4em 0;
}

::v-deep .article-content a {
  border-bottom: 1px solid #808080;
}

</style>
