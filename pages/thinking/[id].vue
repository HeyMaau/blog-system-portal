<script setup lang="ts">
import {ref} from "vue";
import {getThinkingApi} from "~/apis/thinking-api";

const route = useRoute();

const loading = ref(true)
const finish = ref(false)
const empty = ref(false)
const loadingTimeout = ref(false)
const thinkingList = shallowRef([])

getThinking()
setLoadingTimeout()

function getThinking() {
  getThinkingApi(route.params.id).then(response => {
    if (response.code === CODE_SUCCESS) {
      thinkingList.value.push(response.data)
    } else {
      empty.value = true
    }
    finish.value = true
    if (loadingTimeout.value) {
      loading.value = false
    }
  }).catch(() => {
    finish.value = true
    if (loadingTimeout.value) {
      loading.value = false
      empty.value = true
    }
  })
}

function setLoadingTimeout() {
  setTimeout(() => {
    loadingTimeout.value = true
    if (thinkingList.value.length > 0) {
      loading.value = false
      empty.value = false
    } else {
      if (finish.value) {
        loading.value = false
        empty.value = true
      }
    }
  }, 500)
}

</script>

<template>
  <div>
    <SkeletonView4Thinking :count="1" :loading="true" v-show="loading"/>
    <EmptyView v-if="!loading && empty" message="想法不存在噢"/>
    <ThinkingList class="thinking-list" :thinkingList="thinkingList" v-show="!loading && !empty"/>
  </div>
</template>

<style scoped>

.thinking-list {
  width: 700px;
  margin-top: 10px;
  box-sizing: border-box;
}

</style>
