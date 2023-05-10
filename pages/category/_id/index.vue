<template>
  <div class="main-page-container">
    <ArticleList class="article-list" :articleList="articleList">
      <el-pagination
        hide-on-single-page
        @current-change="handleCurrentChange"
        :page-size="size"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </ArticleList>
    <div class="website-info-column">
      <InfoCard :avatarSrc="categoryCover" :title="categoryName">
        <div class="info-item">
          <span>{{ categoryDescription }}</span>
        </div>
      </InfoCard>
    </div>
  </div>
</template>

<script>
import ArticleList from "../../../components/ArticleList";
import {CODE_SUCCESS, URL_IMAGE} from "../../../plugins/constants";
import InfoCard from "../../../components/InfoCard";
import {mapState} from "vuex";
import {trimArticleSummary} from "../../../plugins/article-api";

export default {
  name: "index",
  components: {InfoCard, ArticleList},
  validate({params}) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      articleList: [],
      page: 1,
      size: 5,
      total: 0,
      categoryID: this.$route.params.id,
      categoryCover: '',
      categoryDescription: '',
      categoryName: ''
    }
  },
  methods: {
    async getArticleListByCategory() {
      const {data: response} = await this.$axios.get('article/list', {
        params: {
          page: this.page,
          size: this.size,
          categoryID: this.categoryID
        }
      })
      if (response.code === CODE_SUCCESS) {
        this.articleList = response.data.data
        trimArticleSummary(this.articleList)
        this.total = response.data.total
      } else {
        this.$message.error(response.message)
      }
    },
    handleCurrentChange(page) {
      this.page = page
      this.getArticleListByCategory()
    },
    getCategoryInfo() {
      this.categoryList.forEach(item => {
        if (item.id === this.categoryID) {
          this.categoryCover = URL_IMAGE + item.cover
          this.categoryDescription = item.description
          this.categoryName = item.name
        }
      })
    }
  },
  computed: {
    ...mapState('articleCategory', ['categoryList'])
  },
  created() {
    this.getArticleListByCategory()
    this.getCategoryInfo()
  },
  beforeMount() {
    document.title = `${this.categoryName} | 分类 - 卧卷`
  }
}
</script>

<style scoped>
@import "~assets/article.css";
@import "~assets/page.css";
@import "~assets/info-card.css";

.el-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 20px;
}

::v-deep .el-pager li {
  font-size: 15px;
}

</style>
