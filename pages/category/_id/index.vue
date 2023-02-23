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
          <span class="info-icon">
            <svg t="1675065384813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="8466" width="1.2em" height="1.2em"><path
              d="M422.5 837.5c-7.7 0-15.4-2.9-21.2-8.8L196.2 623.6c-11.7-11.7-11.7-30.7 0-42.4s30.7-11.7 42.4 0l205.1 205.1c11.7 11.7 11.7 30.7 0 42.4-5.9 5.8-13.6 8.8-21.2 8.8zM825 435c-7.7 0-15.4-2.9-21.2-8.8L598.7 221.1c-11.7-11.7-11.7-30.7 0-42.4s30.7-11.7 42.4 0l205.1 205.1c11.7 11.7 11.7 30.7 0 42.4-5.9 5.8-13.6 8.8-21.2 8.8z"
              fill="#515151" p-id="8467"></path><path
              d="M127.8 925.4c-7.9 0-15.6-3.1-21.3-8.9-6.9-7-10-17-8.2-26.6 0.1-0.6 12-63.9 26.9-129.5 8.9-38.9 17.1-71.1 24.5-95.8 13.8-46.2 22.7-59.6 30.2-67.1L650.3 127c38.4-38.4 100.5-38.9 138.4-1l110.1 110.1c18.4 18.4 28.3 43 28.1 69.3-0.3 26.1-10.6 50.6-29.1 69.1L427.4 844.9c-7.6 7.6-21 16.5-67.6 30-24.8 7.2-57.3 15.3-96.4 23.9-66.1 14.6-129.7 26-130.4 26.1-1.7 0.4-3.4 0.5-5.2 0.5zM223 639.2c-2.2 3.4-14.9 26.2-40.5 139.5-6.5 28.9-12.4 57.1-16.8 79 22.2-4.3 50.6-10 79.8-16.4 113.6-24.8 136.7-37.3 140.2-39.6L855.4 332l21.2 21.2-21.2-21.2c15-15 15.5-39.1 1-53.5L746.3 168.4c-14.5-14.5-38.5-14-53.5 1L223 639.2z m163.1 162.3zM223.3 638.8z"
              fill="#515151" p-id="8468"></path></svg>
          </span>
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
