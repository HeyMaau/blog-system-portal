<template>
  <div class="banner-container">
    <img :src="avatarSrc" class="banner-avatar"/>
    <div class="banner-author-info-container">
      <div class="banner-author-info-name">{{ name }}</div>
      <div class="banner-author-info-signature">{{ signature }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorInfoBanner",
  props: ['avatarSrc', 'name', 'signature']
}
</script>

<style scoped>

.banner-container {
  display: flex;
  align-items: center;
}

.banner-avatar {
  height: 38px;
  width: 38px;
  border-radius: 50%;
}

.banner-author-info-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 14px;
}

.banner-author-info-name {
  color: #444;
  font-weight: 600;
  line-height: 1.1;
  font-synthesis: style;
}

.banner-author-info-signature {
  color: #646464;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 1.6;
  margin-top: 2px;
}

</style>
