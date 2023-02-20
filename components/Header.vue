<template>
  <div id="header">
    <div id="header-link-area">
      <nuxt-link to="/" class="website-logo">manpok.top</nuxt-link>
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
      @keyup.enter.native="doSearch"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="input">
    </el-input>
    <img src="~static/test.jpg" crossorigin="anonymous" id="avatar"/>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {categories: Array},
  data() {
    return {
      input: ''
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

.website-logo {
  font-size: 20px;
  color: black !important;
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
}

</style>
