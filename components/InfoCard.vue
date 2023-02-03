<template>
  <div class="flex-column-horizontally-space-between card info-card">
    <img :src="avatarSrc" alt="avatar" class="avatar">
    <span class="title">{{ title }}</span>
    <div class="description-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: ['avatarSrc', 'title']
}
</script>

<style scoped>
.flex-column-horizontally-space-between {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.card {
  border-radius: 2px;
  background: white;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
}

.info-card {
  padding: 0 20px;
}

.avatar {
  border-radius: 50%;
  margin: 15px 0;
  width: 100px;
  height: 100px;
}

.title {
  line-height: 30px;
  font-size: 26px;
  font-weight: 600;
  font-synthesis: style;
  margin-bottom: 20px;
}

.description-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
