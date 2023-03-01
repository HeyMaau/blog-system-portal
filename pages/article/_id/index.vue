<template>
  <div class="article-container">
    <h1 class="article-title">
      {{ article.title }}
    </h1>
    <AuthorInfoBanner :avatarSrc="authorInfo.avatar" :name="authorInfo.userName" :signature="authorInfo.sign"/>
    <div v-html="article.content" class="article-content" ref="articleContentRef"></div>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "@/plugins/constants";
import AuthorInfoBanner from "@/components/AuthorInfoBanner";
import {mapState} from "vuex";

export default {
  name: "index",
  components: {AuthorInfoBanner},
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
    ...mapState('authorInfo', ['authorInfo'])
  },
  data() {
    return {
      headers: []
    }
  },
  methods: {
    extractArticleHeader() {
      let children = this.$refs.articleContentRef.children
      console.log(children)
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
        }
      }
    }
  },
  mounted() {
    this.extractArticleHeader()
  }
}
</script>

<style scoped>

.article-container {
  width: 700px;
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

</style>
