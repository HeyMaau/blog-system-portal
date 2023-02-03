<template>
  <div class="article-container">
    <h1 class="article-title">
      {{ article.title }}
    </h1>
    <div v-html="article.content" class="article-content">

    </div>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "@/plugins/constants";

export default {
  name: "index",
  validate({params}) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      article: {}
    }
  },
  methods: {
    async getArticle() {
      const {data: response} = await this.$axios.get('article/' + this.$route.params.id)
      if (response.code === CODE_SUCCESS) {
        this.article = response.data
      } else {
        this.$message.error(response.message)
      }
    }
  },
  created() {
    this.getArticle()
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

::v-deep .article-content img {
  max-width: 100%;
}

</style>
