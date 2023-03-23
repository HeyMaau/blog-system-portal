<template>
  <div class="publish-comment-container">
    <textarea class="comment-input-area" ref="inputContentRef" rows="1" placeholder="请输入评论内容"
              v-model="comment.content"></textarea>
    <div class="publish-panel-container">
      <div class="emoji-container">
        <svg t="1679560083856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="15285" width="16" height="16">
          <path
            d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m0 960C265 960 64 759 64 512S265 64 512 64s448 201 448 448-201 448-448 448z"
            p-id="15286"></path>
          <path d="M320 405.3m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="15287"></path>
          <path d="M704 405.3m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="15288"></path>
          <path d="M512 810.7c117.8 0 213.3-95.5 213.3-213.3H298.7c0 117.8 95.5 213.3 213.3 213.3z" p-id="15289"></path>
        </svg>
      </div>
      <el-button type="primary" size="small">发表</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleComment",
  data() {
    return {
      comment: {
        content: ''
      }
    }
  },
  methods: {
    adjustTextareaHeight(event) {
      this.$refs.inputContentRef.style.height = 'inherit'
      this.$refs.inputContentRef.style.height = event.target.scrollHeight + 'px'
    }
  },
  mounted() {
    this.$refs.inputContentRef.addEventListener('input', this.adjustTextareaHeight)
  },
  beforeDestroy() {
    this.$refs.inputContentRef.removeEventListener('input', this.adjustTextareaHeight)
  }
}
</script>

<style scoped>

::v-deep .comment-input-area {
  width: 100%;
  outline: none;
  resize: none;
  border: none;
  line-height: 1.6;
  background: transparent;
  padding: 0;
  font-size: 15px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.publish-comment-container {
  border: 1px solid rgb(235, 235, 235);
  border-radius: 4px;
  padding: 8px 12px;
}

.publish-panel-container {
  border-top: 1px solid rgb(235, 235, 235);
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.emoji-container {
  display: flex;
  align-items: center;
}

</style>
