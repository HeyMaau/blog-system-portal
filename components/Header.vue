<template>
  <div :class="isCategoryPage">
    <a href="//manpok.top" class="website-logo-container"><img src="/logo.png" class="website-logo"/></a>
    <div id="header-link-area">
      <NuxtLink to="/" :class="{'active-path': activePath === '/'}">首页</NuxtLink>
      <el-dropdown :class="{'active-path': activePath.startsWith('/category')}">
        <span class="el-dropdown-link no-outline dropdown-link-align-center">
          文章
          <el-icon class="el-icon--right">
            <ArrowDown/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in categories" :key="item.id"
                              :class="{'active-category': activePath.endsWith(item.id)}">
              <NuxtLink :to="`/category/${item.id}`">{{ item.name }}</NuxtLink>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <NuxtLink to="/thinking" :class="{'active-path': activePath === '/thinking'}">想法</NuxtLink>
      <NuxtLink to="/feedback" :class="{'active-path': activePath === '/feedback'}">联系我</NuxtLink>
    </div>
    <el-input
      class="search-input"
      @keyup.enter.native="doSearch"
      placeholder="请输入内容"
      :prefix-icon="Search"
      v-model="input">
    </el-input>
    <img :src="avatarUrl" id="avatar"/>
  </div>
</template>

<script>
import {CODE_SUCCESS, URL_IMAGE} from "~/utils/constants";
import {useAuthorInfoStore} from "~/store/useAuthorInfoStore.ts";
import {mapStores} from "pinia";
import {useArticleCategoryStore} from "~/store/useArticleCategoryStore.ts";
import {getCategoryListApi} from "~/apis/category-api.ts";
import {getAdminInfoApi} from "~/apis/user-api.ts";
import {ArrowDown, Search} from "@element-plus/icons-vue";

export default {
  name: "Header",
  components: {ArrowDown},
  props: {categories: Array, activePath: String},
  data() {
    return {
      input: '',
      avatarUrl: ''
    }
  },
  computed: {
    Search() {
      return Search
    },
    isCategoryPage() {
      if (this.$route.path.startsWith('/category')) {
        return 'header-for-category-page'
      }
      return 'header'
    },
    ...mapStores(useAuthorInfoStore, useArticleCategoryStore)
  },
  methods: {
    doSearch() {
      const {href} = this.$router.resolve({path: '/search', query: {keyword: this.input}})
      window.open(href, '_blank')
    },
    async getAuthorInfo() {
      const response = await getAdminInfoApi()
      if (response.code === CODE_SUCCESS) {
        this.authorInfoStore.setAuthorInfo(response.data)
        this.avatarUrl = URL_IMAGE.value + response.data.avatar
      }
    },
    async getCategories() {
      const response = await getCategoryListApi()
      if (response.code === CODE_SUCCESS) {
        this.articleCategoryStore.addCategoryList(response.data)
      }
    }
  },
  created() {
    this.getAuthorInfo()
    this.getCategories()
  }
}
</script>

<style scoped>

.header {
  height: 52px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
}

.header-for-category-page {
  height: 52px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.04);
}

.website-logo-container {
  height: 100%;
}

.website-logo {
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.el-input {
  margin-left: 320px;
  width: 296px;
}

#header-link-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
}

#header-link-area a, .el-dropdown {
  margin: 0 22px;
  color: #8590a6;
  flex-shrink: 0;
  position: relative;
}

#header-link-area a:hover, .el-dropdown:hover {
  color: #175199;
  cursor: pointer;
}

.active-path {
  color: #121212 !important;
  font-weight: 600;
  font-synthesis: style;
}

.active-category a {
  color: #056DE8;
}

.active-path::after {
  background: #056DE8;
  content: "";
  height: 4px;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -16px;
}

.el-dropdown {
  font-size: 15px;
}

#avatar {
  height: 40px;
  width: 40px;
  margin-left: 20px;
  flex-shrink: 0;
}

.search-input {
  flex-shrink: 0;
}

.no-outline {
  outline: none;
}

.dropdown-link-align-center {
  display: inline-flex;
  align-items: center;
  position: relative;
  top: 2px;
}

</style>
