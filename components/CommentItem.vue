<template>
  <div class="comment-item-container">
    <img :src="avatarUrl" width="24" height="24">
    <div class="comment-content-container">
      <div class="comment-author-name">
        {{ comment.userName }}
        <svg v-if="comment.replyUserName" t="1679902765898" class="icon reply-to-icon" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="4375" width="8" height="8">
          <path
            d="M986.451968 460.0832L86.919168 5.632C72.736768-0.768-7.288832-18.432 0.595968 75.008c30.5152 151.6544 75.4176 385.7408 75.4176 385.7408l658.432 51.2-658.432 76.8S31.111168 797.184 0.595968 948.9408c-7.936 93.3888 72.0896 75.7248 86.3232 69.3248l899.5328-454.4512c42.7008-23.552 54.5792-73.728 0-103.7312z"
            fill="#999999" p-id="4376"></path>
        </svg>
        {{ comment.replyUserName }}
      </div>
      <div class="comment-content">{{ comment.content }}</div>
      <div class="comment-update-time-and-reply-button-container">
        <div class="comment-update-time">{{ comment.updateTime }}</div>
        <div class="reply-button-container" @click="replyComment">
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
      <PublishComment v-show="showPublishComment" class="publish-comment"
                      :type="type"
                      :articleID="articleID"
                      :emojiPosition="type === '1'? 'up': 'down'"
                      :parentInfo="parentInfo" @publishSuccess="onPublishCommentSuccess"/>
      <CommentItem v-for="child in comment.children" :key="child.id" :comment="child"
                   :type="type"
                   :articleID="articleID"
                   class="child-comment-item-container"
                   @childrenReplySuccess="onChildrenReplySuccess"
                   :parentInfo="{parentCommentId: parentInfo.parentCommentId, replyCommentId: child.id, replyUserName: child.userName}"/>
    </div>
  </div>
</template>

<script>
import PublishComment from "./PublishComment.vue";
import {URL_IMAGE} from "~/utils/constants";

export default {
  name: "CommentItem",
  components: {PublishComment},
  props: {
    comment: Object,
    parentInfo: Object,
    type: String,
    articleID: String
  },
  data() {
    return {
      showPublishComment: false,
      avatarUrl: `${URL_IMAGE.value}comment/${this.comment.userAvatar}`
    }
  },
  methods: {
    replyComment() {
      this.showPublishComment = !this.showPublishComment
    },
    onPublishCommentSuccess() {
      this.showPublishComment = false
      this.$emit('replySuccess')
      this.$emit('childrenReplySuccess')
    },
    onChildrenReplySuccess() {
      this.$emit('replySuccess')
    }
  }
}
</script>

<style scoped>

.comment-item-container {
  padding: 10px 20px 14px;
  display: flex;
}

.comment-content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  width: 100%;
}

.comment-author-name {
  color: #444444;
  font-weight: bold;
  display: flex;
  align-items: center;
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
  cursor: pointer;
}

.reply-icon {
  margin-right: 4px;
}

.child-comment-item-container {
  padding: 24px 20px 0 0;
  display: flex;
}

.publish-comment {
  margin-top: 8px;
}

.reply-to-icon {
  margin: 0 8px;
}

</style>
