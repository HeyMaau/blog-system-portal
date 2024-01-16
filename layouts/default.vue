<template>
  <div class="container">
    <ClientOnly>
      <Header :categories="articleCategoryStore.categoryList" class="header" :activePath="routerPath"/>
    </ClientOnly>
    <div class="main">
      <NuxtPage/>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import {useCurrentRouterPath} from "~/composables/useCurrentRouterPath";
import {useArticleCategoryStore} from "~/store/useArticleCategoryStore";

const routerPath = useCurrentRouterPath()
const articleCategoryStore = useArticleCategoryStore()

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
