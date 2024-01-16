<template>
  <el-skeleton class="skeleton-container" animated :count="count" :loading="loading">
    <template #template>
      <div class="skeleton-author-info">
        <el-skeleton-item class="skeleton-author-avatar" variant="image"/>
        <div class="skeleton-author-name-sign">
          <el-skeleton-item variant="text" style="width: 30%"/>
          <el-skeleton-item variant="text" style="width: 30%"/>
        </div>
      </div>
      <el-skeleton-item variant="h1"/>
      <el-skeleton-item variant="text"/>
      <el-skeleton-item variant="text"/>
      <el-skeleton-item variant="text"/>
      <div class="skeleton-pictures-container">
        <el-skeleton-item class="skeleton-picture" variant="image" style="width: 163px; height: 163px;"/>
        <el-skeleton-item class="skeleton-picture" variant="image" style="width: 163px; height: 163px;"/>
        <el-skeleton-item class="skeleton-picture" variant="image" style="width: 163px; height: 163px;"/>
        <el-skeleton-item class="skeleton-picture" variant="image" style="width: 163px; height: 163px;"/>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  name: "SkeletonView4Thinking",
  props: {count: Number, loading: Boolean}
}
</script>

<style scoped>

.skeleton-container {
  padding: 16px 20px;
}

.skeleton-pictures-container {
  display: flex;
}

.skeleton-picture {
  margin-right: 5px;
}

.skeleton-author-avatar {
  height: 38px;
  width: 38px;
  box-sizing: border-box;
  border-radius: 2px;
  margin: 0;
}

.skeleton-author-info {
  display: flex;
  margin-bottom: 9px;
  margin-top: 20px;
}

.skeleton-container .skeleton-author-info:first-child {
  margin-top: 0;
}

.skeleton-author-name-sign {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-left: 14px;
}

</style>
