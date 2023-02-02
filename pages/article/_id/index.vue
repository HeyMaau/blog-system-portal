<template>
  <div>article</div>
</template>

<script>
export default {
  name: "index",
  validate({params}) {
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped>

</style>
