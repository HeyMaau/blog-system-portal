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
  position: sticky;
  top: 0;
}

.el-main {
  height: 100%;
  display: flex;
  justify-content: center;
}

</style>
