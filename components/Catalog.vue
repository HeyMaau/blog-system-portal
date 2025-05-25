<template>
  <div class="container">
    <CatalogBanner/>
    <div class="catalog-item-list">
      <div v-for="item in headers" :key="item.id"
           :style="{'--highlightColor': item.id === activeHeader? '#056DE8': '#8590a6'}"
           class="catalog-item-container"
           :class="{'header-first-level': item.level === '1', 'header-second-level': item.level === '2',
         'header-third-level': item.level === '3'}">
        <div class="catalog-link-container" :style="{marginLeft: 10 * item.level + 'px'}">
          <a :href="'#' + item.id"
             :class="{'catalog-link': item.id !== activeHeader, 'catalog-link-highlight': item.id === activeHeader}">
            {{ item.text }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogBanner from "~/components/CatalogBanner.vue";

export default {
  name: "Catalog",
  components: {CatalogBanner},
  props: {
    headers: Array,
    activeHeader: String
  }
}
</script>

<style scoped>

.catalog-item-list {
  margin-top: 20px;
  max-height: calc(((100vh - 72px) - 20px) - 80px);
  overflow: scroll;
  padding-left: 20px;
}

.catalog-item-list::-webkit-scrollbar {
  width: 0 !important;
}

span {
  margin-left: 10px;
}

.catalog-item-container {
  display: flex;
  align-items: center;
  position: relative;
}

.catalog-link {
  color: #8590a6;
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  width: 100%;
  display: inline-block;
}

.catalog-link-highlight {
  color: #056DE8;
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  width: 100%;
  display: inline-block;
}

.catalog-link-container:hover {
  color: #056DE8;
  background: #EBEBEB;
  border-radius: 4px;
}

.catalog-link-container {
  width: 100%;
  padding-left: 15px;
}

.header-first-level:before {
  display: inline-block;
  content: " ";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--highlightColor);
  margin-right: 12px;
  position: absolute;
  left: 0;
}

.header-first-level:after, .header-second-level:after, .header-third-level:after {
  display: inline-block;
  content: " ";
  width: 2px;
  height: 30px;
  background: rgba(133, 144, 166, 0.12);
  position: absolute;
  left: 2px;
  transform: translate(0, 50%);
}

.header-second-level:before, .header-third-level:before {
  display: inline-block;
  content: " ";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--highlightColor);
  margin-right: 12px;
  position: absolute;
  left: 1px;
}

.catalog-item-container:last-of-type:after {
  height: 0;
}

</style>
