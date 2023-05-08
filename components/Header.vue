<template>
  <div id="header">
    <nuxt-link to="/" class="website-logo-container"><img src="~static/logo.png" class="website-logo"/></nuxt-link>
    <div id="header-link-area">
      <nuxt-link to="/">首页</nuxt-link>
      <el-dropdown>
        <span class="el-dropdown-link">
          文章<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in categories" :key="item.id">
            <nuxt-link :to="`/category/${item.id}`">{{ item.name }}</nuxt-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <nuxt-link to="/thinking">想法</nuxt-link>
      <nuxt-link to="/feedback">联系我</nuxt-link>
    </div>
    <el-input
      class="search-input"
      @keyup.enter.native="doSearch"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="input">
    </el-input>
    <img :src="avatarUrl" id="avatar"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {URL_IMAGE} from "../plugins/constants";

export default {
  name: "Header",
  props: {categories: Array},
  data() {
    return {
      input: ''
    }
  },
  computed: {
    ...mapState('authorInfo', ['authorInfo']),
    avatarUrl(){
      return URL_IMAGE + this.authorInfo.avatar
    }
  },
  methods: {
    doSearch() {
      const {href} = this.$router.resolve({path: '/search', query: {keyword: this.input}})
      window.open(href, '_blank')
    }
  }
}
</script>

<style scoped>

#header {
  height: 52px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
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

::v-deep .el-input__inner {
  border-radius: 999px;
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

</style>
