<template>
  <div class="category-page-container">
    <div class="category-header-container">
      <div class="category-header-info">
        <span class="category-header-title">{{ categoryName }}</span>
        <span class="category-header-desc">{{ categoryDescription }}</span>
        <div class="category-header-article-count">
          <span class="category-header-total">{{ total }}</span>
          <span>篇文章</span>
        </div>
        <div class="category-header-cover">
          <img :src="categoryCover">
        </div>
      </div>
    </div>
    <div class="main-page-container" v-if="!loading && articleList.length > 0">
      <ArticleList class="category-article-list" :articleList="articleList">
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
    </div>
    <SkeletonView :count="5" :loading="loading" v-if="loading" class="category-skeleton"/>
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

.category-page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 20px;
}

::v-deep .el-pager li {
  font-size: 15px;
}

.category-skeleton {
  margin-top: 10px;
  width: 700px;
}

.empty-view {
  margin-top: 50px;
}

.category-article-list {
  width: 700px;
}

.category-header-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background: white;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, .1);
}

.category-header-info {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
  margin: 24px 0;
  padding-left: 20px;
  color: #8493a5;
  font-size: 15px;
  line-height: 24px;
}

.category-header-title {
  color: #121212;
  font-size: 26px;
  line-height: 36px;
  font-weight: 600;
}

.category-header-desc {
  color: #454545;
  font-size: 18px;
  line-height: 22px;
  margin-top: 8px;
}

.category-header-article-count {
  margin-top: 12px;
}

.category-header-total {
  color: #454545;
}

.category-header-cover {
  display: flex;
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 2px solid white;
  right: 0;
  top: 0;
}

</style>
