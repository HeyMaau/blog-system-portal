<template>
  <div class="article-container">
    <h1 class="article-title">
      {{ article.title }}
    </h1>
    <AuthorInfoBanner avatarSrc="/test.jpg" name="HeyMaau" signature="菜鸡小码农"/>
    <div v-html="article.content" class="article-content"></div>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "@/plugins/constants";
import AuthorInfoBanner from "@/components/AuthorInfoBanner";

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
