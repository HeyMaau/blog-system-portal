<template>
  <div class="container" id="container">
    <img
      v-for="(image, index) in images"
      v-show="index - (limit - 1) <= 0"
      class="picture-item"
      :src="imageBaseUrl + image"/>
    <div class="more-pictures-mask" v-if="images.length > limit">
          <span class="more-pictures-mask-text">
            {{ `+ ${images.length - limit}` }}
          </span>
    </div>
  </div>
</template>

<script>
import {URL_IMAGE} from "../plugins/constants";
import Viewer from "viewerjs";

export default {
  name: "ThinkingPictureList",
  props: {
    limit: Number,
    images: Array
  },
  data() {
    return {
      imageBaseUrl: URL_IMAGE,
    }
  },
  methods: {
    initPicViewer() {
      this.$nextTick(() => {
        let picViewer = new Viewer(document.getElementById('container'), {
          inline: false,
          title: false,
          toolbar: true,
          transition: false,
          navbar: false,
          loop: false
        })
      })
    }
  },
  mounted() {
    this.initPicViewer()
  }
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: left;
  overflow: hidden;
  position: relative;
}

.picture-item {
  width: 163px;
  height: 163px;
  box-sizing: border-box;
  object-fit: cover;
  margin-right: 3px;
  cursor: zoom-in;
}

.more-pictures-mask {
  position: absolute;
  width: 163px;
  height: 163px;
  box-sizing: border-box;
  top: 0;
  right: 3px;
  z-index: 10;
  background: rgba(18, 18, 18, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.more-pictures-mask-text {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  font-style: normal;
}

</style>
