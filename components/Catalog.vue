<template>
  <div>
    <div v-for="item in headers" :key="item.id">
      <a :href="'#' + item.id">{{ item.text }}</a>
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

</style>
