<template>
  <div class="container">
    <svg t="1679912844085" class="icon arrow-icon" viewBox="0 0 1024 1024" version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         p-id="6619" width="32" height="32">
      <path d="M928 721.8L510.8 304.5l-416 416 833.2 1.3z m0 0" p-id="6620" fill="#ffffff"></path>
    </svg>
    <div class="emoji-container">
      <ul>
        <li v-for="(item, index) in emojiList" :key="index" @click="onEmojiClick(item)">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {emoji} from "../plugins/emoji";

export default {
  name: "EmojiPanel",
  data() {
    return {
      emojiList: emoji
    }
  },
  methods: {
    onEmojiClick(value) {
      this.$emit('onClick', value)
    }
  }
}
</script>

<style scoped>

.container {
  width: 323px;
  position: relative;
}

ul {
  margin: 0;
  padding: 5px 5px 0;
  list-style-type: none;
}

li {
  display: inline-flex;
  padding: 5px;
  font-size: 18px;
}

.emoji-container {
  background: white;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 20px 0px;
}

.arrow-icon {
  position: absolute;
  top: -5px;
  left: 162px;
  transform: translate(-50%, -50%);
}

</style>
