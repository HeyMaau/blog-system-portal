<template>
  <div>
    <div class="main-page-container" v-if="!loading && articleList.length > 0">
      <ArticleList class="article-list" :articleList="articleList">
        <el-pagination
          hide-on-single-page
          @current-change="handleCurrentChange"
          :page-size="size"
          :pager-count="5"
          :current-page="page"
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
    <SkeletonView :count="5" :loading="loading" v-if="loading"/>
    <EmptyView class="empty-view" v-if="!loading && articleList.length === 0" message="在写了在写了！！！"/>
  </div>
</template>

<script>
import ArticleList from "../../../components/ArticleList";
import {CODE_SUCCESS, URL_IMAGE} from "../../../plugins/constants";
import InfoCard from "../../../components/InfoCard";
import {mapState} from "vuex";
import {trimArticleSummary} from "../../../plugins/article-api";
import EmptyView from "../../../components/EmptyView";
import SkeletonView from "../../../components/SkeletonView";

export default {
  name: "index",
  components: {SkeletonView, EmptyView, InfoCard, ArticleList},
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
      categoryName: '',
      loadingTimeout: false,
      loading: true,
      hasData: false
    }
  },
  methods: {
    async getArticleListByCategory() {
      this.loading = true
      this.loadingTimeout = false
      this.hasData = false
      const {data: response} = await this.$axios.get('article/list', {
        params: {
          page: this.page,
          size: this.size,
          categoryID: this.categoryID
        }
      })
      this.hasData = true
      if (this.loadingTimeout) {
        this.loading = false
      }
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
      this.setLoadingTimeout()
      scrollTo(0, 0)
    },
    getCategoryInfo() {
      this.categoryList.forEach(item => {
        if (item.id === this.categoryID) {
          this.categoryCover = URL_IMAGE + item.cover
          this.categoryDescription = item.description
          this.categoryName = item.name
        }
      })
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
  computed: {
    ...mapState('articleCategory', ['categoryList'])
  },
  created() {
    this.getArticleListByCategory()
    this.getCategoryInfo()
  },
  beforeMount() {
    document.title = `${this.categoryName} | 分类 - 卧卷`
  },
  mounted() {
    this.setLoadingTimeout()
  }
}
</script>

<style src="@/assets/article.css" scoped/>
<style src="@/assets/page.css" scoped/>
<style src="@/assets/info-card.css" scoped/>
<style scoped>

.el-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 20px;
}

::v-deep .el-pager li {
  font-size: 15px;
}

.empty-view {
  margin-top: 50px;
}

</style>
