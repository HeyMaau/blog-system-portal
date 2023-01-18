<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "default",
  components: {Header}
}
</script>

<style scoped>

.el-header {
  padding: 0;
}

</style>
