<template>
  <div id="header">
    <div id="header-link-area">
      <nuxt-link to="/">manpok.top</nuxt-link>
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
    <img src="http://localhost:8080/admin/image/368901746140905472" crossorigin="anonymous" id="avatar"/>
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
  background-color: cornflowerblue;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-input {
  width: 296px;
}

#header-link-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
}

#header-link-area a {
  margin: 0 22px;
}

.el-dropdown {
  margin: 0 22px;
}

#avatar {
  height: 40px;
  width: 40px;
  margin-left: 20px;
}

</style>
