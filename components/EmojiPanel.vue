<template>
  <div class="container">
    <svg t="1679912844085" class="icon arrow-icon" viewBox="0 0 1024 1024" version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         p-id="6619" width="32" height="32">
      <path d="M928 721.8L510.8 304.5l-416 416 833.2 1.3z m0 0" p-id="6620" fill="#ffffff"></path>
    </svg>
    <div class="emoji-container">
      <ul>
        <li v-for="(item, index) in emojiList[currentPage]" :key="index" @click="onEmojiClick(item)">{{ item }}</li>
      </ul>
      <div class="pagination-container">
        <div
          :class="[item === currentPage? 'pagination-dot-active': 'pagination-dot-inactive', 'pagination-dot-active-hover']"
          v-for="item in indexList"
          @click="currentPage = item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {emoji} from "../plugins/emoji";
import {EMOJI_NUM_PER_PAGE} from "../plugins/constants";

export default {
  name: "EmojiPanel",
  data() {
    return {
      emojiList: [],
      indexList: [],
      currentPage: 0
    }
  },
  methods: {
    onEmojiClick(value) {
      this.$emit('onClick', value)
    },
    initIndex() {
      let pageNum = Math.ceil(emoji.length / EMOJI_NUM_PER_PAGE);
      for (let i = 0; i < pageNum; i++) {
        this.indexList.push(i)
      }
    },
    sliceEmojis() {
      for (let i = 0; i < this.indexList.length; i++) {
        this.emojiList.push(emoji.slice(i * EMOJI_NUM_PER_PAGE, (i + 1) * EMOJI_NUM_PER_PAGE))
      }
    }
  },
  created() {
    this.initIndex()
    this.sliceEmojis()
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
  padding: 5px 5px 10px;
  list-style-type: none;
  height: 185px;
  box-sizing: border-box;
}

li {
  display: inline-flex;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
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

.pagination-container {
  display: flex;
  justify-content: center;
  padding-bottom: 4px;
}

.pagination-dot-active {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #808080;
  margin: 0 4px;
  cursor: pointer;
}

.pagination-dot-active-hover:hover {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #808080;
  margin: 0 4px;
  cursor: pointer;
}

.pagination-dot-inactive {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #D3D3D3;
  margin: 0 4px;
  cursor: pointer;
}

</style>
