<template>
  <div class="container">
    <div class="catalog-banner">
      <svg t="1677762161528" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="2789" width="20" height="20">
        <path
          d="M640 192H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h416c17.7 0 32 14.3 32 32s-14.3 32-32 32zM960 544H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h736c17.7 0 32 14.3 32 32s-14.3 32-32 32zM640 896H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h416c17.7 0 32 14.3 32 32s-14.3 32-32 32zM96 192H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32zM96 544H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32zM96 896H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          fill="#8590a6" p-id="2790"></path>
      </svg>
      <span>目录</span>
    </div>
    <div class="catalog-item-list">
      <div v-for="item in headers" :key="item.id"
           :style="{'--highlightColor': item.id === activeHeader? '#056DE8': '#8590a6'}"
           class="catalog-item-container"
           :class="{'header-first-level': item.level === '1', 'header-second-level': item.level === '2',
         'header-third-level': item.level === '3'}">
        <div class="catalog-link-container" :style="{marginLeft: 5 * item.level + 'px'}">
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
export default {
  name: "Catalog",
  props: {
    headers: Array,
    activeHeader: String
  }
}
</script>

<style scoped>

.container {
  position: relative;
}

.catalog-banner {
  width: 100%;
  height: 40px;
  position: relative;
  left: -20px;
  display: flex;
  background: white;
  padding-left: 10px;
  color: #8590a6;
  align-items: center;
  box-shadow: rgb(18 18 18 / 10%) 0px 1px 3px;
  border-radius: 4px;
  font-size: 14px;
}

.catalog-item-list {
  margin-top: 20px;
}

span {
  margin-left: 10px;
}

.catalog-item-container {
  display: flex;
  align-items: center;
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
  transform: translate(-50%);
}

.header-first-level:after, .header-second-level:after, .header-third-level:after {
  display: inline-block;
  content: " ";
  width: 2px;
  height: 30px;
  background: rgba(133, 144, 166, 0.12);
  position: absolute;
  left: 0;
  transform: translate(-50%, 50%);
}

.header-second-level:before {
  display: inline-block;
  content: " ";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--highlightColor);
  margin-right: 12px;
  position: absolute;
  left: 0;
  transform: translate(-50%);
}

.header-third-level:before {
  display: inline-block;
  content: " ";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--highlightColor);
  margin-right: 12px;
  position: absolute;
  left: 0;
  transform: translate(-50%);
}

.catalog-item-container:last-of-type:after {
  height: 0;
}

</style>
