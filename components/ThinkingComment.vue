<template>
  <div>
    <PublishComment :parentInfo="parentInfo" type="1" :articleID="id" @publishSuccess="getComments(page, size)"
                    emojiPosition="up"/>
    <div class="comment-list-container common-round-border" v-if="commentList.length > 0">
      <div class="total-comment">{{ commentList.length }}条评论</div>
      <div class="comment-item-list-container">
        <CommentItem v-for="item in commentList" :key="item.id" :comment="item"
                     type="1"
                     :articleID="id"
                     @replySuccess="getComments(page, size)"
                     :parentInfo="{parentCommentId: item.id, replyCommentId: null, replyUserName: null}"/>
      </div>
    </div>
  </div>
</template>

<script>
import {CODE_SUCCESS, COMMENT_TYPE_THINKING} from "../plugins/constants";
import PublishComment from "./PublishComment";
import CommentItem from "./CommentItem";

export default {
  name: "ThinkingComment",
  components: {CommentItem, PublishComment},
  props: {
    id: String,
  },
  data() {
    return {
      page: 1,
      size: 10,
      commentList: [],
      noMore: true,
      parentInfo: {
        parentCommentId: null,
        replyCommentId: null,
        replyUserName: null
      },
      thinkingID: this.id
    }
  },
  methods: {
    async getComments(page, size) {
      const {data: response} = await this.$axios.get(`/comment/list/${COMMENT_TYPE_THINKING}/${this.thinkingID}`, {
        params: {
          page,
          size
        }
      })
      if (response.code === CODE_SUCCESS) {
        this.commentList = response.data.data
        this.noMore = response.data.noMore
        this.$emit('onCommentUpdate', this.thinkingID, this.commentList)
      } else {
        this.$message.error(response.message)
      }
    }
  },
  beforeMount() {
    this.getComments(this.page, this.size)
  }
}
</script>

<style scoped>

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

.comment-item-list-container {
  padding: 10px 0;
}

.common-round-border {
  border: 1px solid rgb(235, 235, 235);
  border-radius: 4px;
}

</style>
