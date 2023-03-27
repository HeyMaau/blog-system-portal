<template>
  <div class="publish-comment-container common-round-border" ref="publishCommentRef">
    <textarea class="comment-input-area" ref="inputContentRef" rows="1" placeholder="请输入评论内容"
              v-model="comment.content"></textarea>
    <div v-show="showFull">
      <div class="border-top-padding">
        <input placeholder="请输入昵称（用于显示评论）" class="nickname-email-input border-top-padding"
               v-model="comment.userName"></input>
      </div>
      <div class="border-top-padding">
        <input placeholder="请输入邮箱（仅用于生成头像，不对外公开）"
               class="nickname-email-input border-top-padding" v-model="comment.userEmail"></input>
      </div>
      <div class="publish-panel-container border-top-padding">
        <div class="emoji-container">
          <svg t="1679560083856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="15285" width="16" height="16">
            <path
              d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m0 960C265 960 64 759 64 512S265 64 512 64s448 201 448 448-201 448-448 448z"
              p-id="15286"></path>
            <path d="M320 405.3m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="15287"></path>
            <path d="M704 405.3m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="15288"></path>
            <path d="M512 810.7c117.8 0 213.3-95.5 213.3-213.3H298.7c0 117.8 95.5 213.3 213.3 213.3z"
                  p-id="15289"></path>
          </svg>
        </div>
        <el-button type="primary" size="small" :disabled="buttonDisabled" @click="publishComment">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "../plugins/constants";

export default {
  name: "PublishComment",
  props: {
    parentInfo: Object
  },
  data() {
    return {
      comment: {
        content: '',
        articleId: this.$route.params.id,
        parentCommentId: null,
        replyCommentId: null,
        replyUserName: null,
        userAvatar: '',
        userEmail: '',
        userName: ''
      },
      showFull: false,
      buttonDisabled: true,
    }
  },
  methods: {
    adjustTextareaHeight(event) {
      this.$refs.inputContentRef.style.height = 'inherit'
      this.$refs.inputContentRef.style.height = event.target.scrollHeight + 'px'
    },
    showPublishComment(event) {
      event.stopPropagation()
      this.showFull = true
    },
    hidePublishComment() {
      this.showFull = false
    },
    async publishComment() {
      this.comment.parentCommentId = this.parentInfo.parentCommentId
      this.comment.replyCommentId = this.parentInfo.replyCommentId
      this.comment.replyUserName = this.parentInfo.replyUserName
      const {data: response} = await this.$axios.post('comment', this.comment)
      if (response.code === CODE_SUCCESS) {
        this.$message.success('发表评论成功！')
        this.resetComment()
        this.hidePublishComment()
      } else {
        this.$message.error(response.message)
      }
    },
    resetComment() {
      this.comment.content = ''
      this.comment.parentCommentId = ''
      this.comment.replyCommentId = ''
      this.comment.userName = ''
      this.comment.userEmail = ''
      this.comment.userAvatar = ''
      this.comment.replyUserName = ''
    }
  },
  watch: {
    comment: {
      deep: true,
      handler: function () {
        this.buttonDisabled = this.comment.content.trim().length === 0
          || this.comment.userName.trim().length === 0
          || this.comment.userEmail.trim().length === 0;
      }
    }
  },
  mounted() {
    this.$refs.inputContentRef.addEventListener('input', this.adjustTextareaHeight)
    document.addEventListener('click', this.hidePublishComment)
    this.$refs.publishCommentRef.addEventListener('click', this.showPublishComment)
  },
  beforeDestroy() {
    this.$refs.inputContentRef.removeEventListener('input', this.adjustTextareaHeight)
    document.removeEventListener('click', this.hidePublishComment)
    this.$refs.publishCommentRef.removeEventListener('click', this.showPublishComment)
  }
}
</script>

<style scoped>

.publish-comment-container {
  padding: 8px 12px;
}

.common-round-border {
  border: 1px solid rgb(235, 235, 235);
  border-radius: 4px;
}

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

.border-top-padding {
  padding: 8px 0;
  border-top: 1px solid rgb(235, 235, 235);
}

.nickname-email-input {
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.publish-panel-container {
  display: flex;
  justify-content: space-between;
}

.emoji-container {
  display: flex;
  align-items: center;
}

</style>
