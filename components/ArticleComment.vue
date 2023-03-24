<template>
  <div>
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
    <div class="comment-list-container common-round-border">
      <div class="total-comment">{{ commentList.length }}条评论</div>
      <div class="comment-item-list-container">
        <div class="comment-item-container" v-for="parentItem in commentList" :key="parentItem.id">
          <img src="/favicon.ico" width="24" height="24">
          <div class="comment-content-container">
            <div class="comment-author-name">{{ parentItem.userName }}</div>
            <div class="comment-content">{{ parentItem.content }}</div>
            <div class="comment-update-time-and-reply-button-container">
              <div class="comment-update-time">{{ parentItem.updateTime }}</div>
              <div class="reply-button-container">
                <svg t="1679646146396" class="icon reply-icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="17956" width="16" height="16">
                  <path
                    d="M480 890.24c-229.546667-14.912-405.333333-189.546667-405.333333-417.92C74.666667 233.429333 266.986667 53.333333 512 53.333333c247.701333 0 437.333333 175.232 437.333333 418.986667 0 212.48-144.661333 371.285333-426.261333 475.050667l-43.072 15.850666v-72.96z m64-19.690667c229.717333-94.506667 341.333333-226.837333 341.333333-398.229333C885.333333 265.088 725.44 117.333333 512 117.333333c-210.56 0-373.333333 152.426667-373.333333 354.986667 0 202.538667 162.773333 354.986667 373.333333 354.986667h32v43.242666z"
                    fill="#8590a6" p-id="17957"></path>
                  <path
                    d="M299.946667 623.914667c52.032 41.856 124.053333 65.749333 200.746666 65.749333 77.866667 0 150.933333-24.64 203.093334-67.626667a32 32 0 1 0-40.725334-49.386666c-40.32 33.258667-98.922667 53.013333-162.346666 53.013333-62.506667 0-120.32-19.178667-160.64-51.626667a32 32 0 0 0-40.128 49.877334z"
                    fill="#8590a6" p-id="17958"></path>
                </svg>
                <span>回复</span>
              </div>
            </div>
            <div class="child-comment-item-container" v-for="childItem in parentItem.children" :key="childItem.id">
              <img src="/favicon.ico" width="24" height="24">
              <div class="comment-content-container">
                <div class="comment-author-name">{{ childItem.userName }}</div>
                <div class="comment-content">{{ childItem.content }}</div>
                <div class="comment-update-time-and-reply-button-container">
                  <div class="comment-update-time">{{ childItem.updateTime }}</div>
                  <div class="reply-button-container">
                    <svg t="1679646146396" class="icon reply-icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="17956" width="16" height="16">
                      <path
                        d="M480 890.24c-229.546667-14.912-405.333333-189.546667-405.333333-417.92C74.666667 233.429333 266.986667 53.333333 512 53.333333c247.701333 0 437.333333 175.232 437.333333 418.986667 0 212.48-144.661333 371.285333-426.261333 475.050667l-43.072 15.850666v-72.96z m64-19.690667c229.717333-94.506667 341.333333-226.837333 341.333333-398.229333C885.333333 265.088 725.44 117.333333 512 117.333333c-210.56 0-373.333333 152.426667-373.333333 354.986667 0 202.538667 162.773333 354.986667 373.333333 354.986667h32v43.242666z"
                        fill="#8590a6" p-id="17957"></path>
                      <path
                        d="M299.946667 623.914667c52.032 41.856 124.053333 65.749333 200.746666 65.749333 77.866667 0 150.933333-24.64 203.093334-67.626667a32 32 0 1 0-40.725334-49.386666c-40.32 33.258667-98.922667 53.013333-162.346666 53.013333-62.506667 0-120.32-19.178667-160.64-51.626667a32 32 0 0 0-40.128 49.877334z"
                        fill="#8590a6" p-id="17958"></path>
                    </svg>
                    <span>回复</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="comment-item-container">
          <img src="/favicon.ico" width="24" height="24">
          <div class="comment-content-container">
            <div class="comment-author-name">测试人员1</div>
            <div class="comment-content">测试评论内容</div>
            <div class="comment-update-time">1911-11-11</div>
          </div>
        </div>
        <div class="comment-item-container">
          <img src="/favicon.ico" width="24" height="24">
          <div class="comment-content-container">
            <div class="comment-author-name">测试人员1</div>
            <div class="comment-content">测试评论内容</div>
            <div class="comment-update-time">1911-11-11</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "../plugins/constants";

export default {
  name: "ArticleComment",
  data() {
    return {
      comment: {
        content: '',
        articleId: this.$route.params.id,
        parentCommentId: null,
        replyCommentId: '',
        replyUserName: '',
        userAvatar: '',
        userEmail: '',
        userName: ''
      },
      showFull: false,
      buttonDisabled: true,
      page: 1,
      size: 10,
      commentList: [],
      noMore: true
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
    },
    async getComments(page, size) {
      const {data: response} = await this.$axios.get('/comment/list/' + this.comment.articleId, {
        params: {
          page,
          size
        }
      })
      if (response.code === CODE_SUCCESS) {
        this.commentList = response.data.data
        this.noMore = response.data.noMore
      } else {
        this.$message.error(response.message)
      }
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
  created() {
    this.getComments(this.page, this.size)
  },
  beforeDestroy() {
    this.$refs.inputContentRef.removeEventListener('input', this.adjustTextareaHeight)
    document.removeEventListener('click', this.hidePublishComment)
    this.$refs.publishCommentRef.removeEventListener('click', this.showPublishComment)
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

.comment-list-container {
  margin-top: 10px;
}

.total-comment {
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: #444444;
  font-weight: 600;
  border-bottom: 1px solid rgb(235, 235, 235);
}

.comment-item-container {
  padding: 10px 20px 14px;
  display: flex;
}

.child-comment-item-container {
  padding: 24px 20px 0 0;
  display: flex;
}

.comment-content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  width: 100%;
}

.comment-item-list-container {
  padding: 10px 0;
}

.comment-author-name {
  color: #444444;
  font-weight: bold;
}

.comment-content {
  margin-top: 6px;
  color: #444444;
}

.comment-update-time {
  margin-top: 6px;
  color: #999999;
}

.comment-update-time-and-reply-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-button-container {
  display: flex;
  align-items: center;
  color: #8590a6;
}

.reply-icon {
  margin-right: 4px;
}

.publish-comment-container {
  padding: 8px 12px;
}

.border-top-padding {
  padding: 8px 0;
  border-top: 1px solid rgb(235, 235, 235);
}

.common-round-border {
  border: 1px solid rgb(235, 235, 235);
  border-radius: 4px;
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
