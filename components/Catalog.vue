<template>
  <div class="container">
    <div v-for="item in headers" :key="item.id"
         class="catalog-item-container"
         :class="{'header-first-level': item.level === '1', 'header-second-level': item.level === '2',
         'header-third-level': item.level === '3'}">
      <a :href="'#' + item.id" class="catalog-item">{{ item.text }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Catalog",
  props: {
    headers: Array
  }
}
</script>

<style scoped>

.container {
  position: relative;
}

.catalog-item-container {
  display: flex;
  align-items: center;
}

.catalog-item {
  color: #8590a6;
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  width: 100%;
  display: inline-block;
  padding: 0 10px;
}

.catalog-item:hover {
  color: #056DE8;
  background: #EBEBEB;
  border-radius: 4px;
}

.header-first-level:before {
  display: inline-block;
  content: " ";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #8590a6;
  margin-right: 12px;
}

.header-second-level:before {
  display: inline-block;
  content: " ";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #8590a6;
  margin-right: 22px;
}

.header-third-level:before {
  display: inline-block;
  content: " ";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #8590a6;
  margin-right: 32px;
}

</style>
