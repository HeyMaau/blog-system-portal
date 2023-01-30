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
            <nuxt-link :to="`/article/${item.name}`">{{ item.name }}</nuxt-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <nuxt-link to="/thinking">想法</nuxt-link>
      <nuxt-link to="/feedback">联系我</nuxt-link>
    </div>
    <el-input
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
  }
}
</script>

<style scoped>

#header {
  height: 52px;
  background-color: white;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
}

.website-logo {
  font-size: 20px;
  color: black !important;
}

.el-input {
  margin-left: 350px;
  width: 296px;
}

::v-deep .el-input__inner {
  border-radius: 999px;
}

#header-link-area {
  margin-left: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
}

#header-link-area a {
  margin: 0 22px;
  color: #8590a6;
}

.el-dropdown {
  margin: 0 22px;
  color: #8590a6;
  font-size: 15px;
}

#avatar {
  height: 40px;
  width: 40px;
  margin-left: 20px;
}

</style>
