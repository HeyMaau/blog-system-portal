<template>
  <div class="container">
    <Header :categories="categoryList" class="header"/>
    <div class="main">
      <nuxt/>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Header from "../components/Header";
import {mapState} from 'vuex'

export default {
  name: "default",
  components: {Header},
  middleware: ['get-categories', 'get-authorInfo'],
  computed: {
    ...mapState('articleCategory', ['categoryList'])
  }
}
</script>

<style scoped>

.container {
  height: 100%;
}

.header {
  position: fixed;
  width: 100%;
  z-index: 1;
}

.main {
  display: flex;
  justify-content: center;
  padding-top: 52px;
}

</style>
