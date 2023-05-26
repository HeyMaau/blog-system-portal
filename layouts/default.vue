<template>
  <div class="container">
    <Header :categories="categoryList" class="header" :activePath="routerPath"/>
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
  computed: {
    ...mapState('articleCategory', ['categoryList']),
    ...mapState('routerPath', ["routerPath"])
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
  min-width: 1100px;
  z-index: 1;
}

.main {
  display: flex;
  justify-content: center;
  padding-top: 52px;
}

</style>
