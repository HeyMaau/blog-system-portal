<template>
  <el-container>
    <el-header height="52px">
      <Header :categories="categoryList"/>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import {mapState} from 'vuex'

export default {
  name: "default",
  components: {Header},
  middleware: 'get-categories',
  computed: {
    ...mapState('articleCategory', ['categoryList'])
  }
}
</script>

<style scoped>

.el-header {
  padding: 0;
  position: sticky;
  top: 0;
}

.el-main {
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
}

</style>
