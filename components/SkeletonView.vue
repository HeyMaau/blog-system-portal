<template>
  <el-skeleton class="skeleton-container card" animated :count="count" :loading="loading">
    <template #template>
      <el-skeleton-item variant="h1" class="title"/>
      <div class="cover-summary-container">
        <el-skeleton-item
          variant="image"
          style="width: 190px; height: 105px; margin-right: 18px"
        />
        <div class="summary-container">
          <el-skeleton-item
            v-for="i in 4"
            :key="i"
            variant="text"/>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  name: "SkeletonView",
  props: {count: Number, loading: Boolean}
}
</script>

<style src="@/assets/article.css" scoped/>
<style scoped>

.skeleton-container {
  width: 694px;
  padding: 0 20px 20px;
  box-sizing: border-box;
}

.title {
  margin-top: 20px;
}

.cover-summary-container {
  display: flex;
}

.summary-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  width: 100%;
}

</style>
