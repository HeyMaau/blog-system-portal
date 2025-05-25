<script setup lang="ts">

import CatalogBanner from "~/components/CatalogBanner.vue";
import {MdCatalog} from "md-editor-v3";

const props = defineProps(['id', 'scrollElement'])
</script>

<template>
  <div>
    <CatalogBanner/>
    <MdCatalog :editorId="props.id" :scrollElement="props.scrollElement" class="md-catalog"/>
  </div>

</template>

<style scoped>
.md-catalog {
  margin-top: 20px;
}
</style>
