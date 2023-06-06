<template>
  <div>
    <PublishComment :parentInfo="parentInfo" @publishSuccess="getComments(page, size)"/>
    <div class="comment-list-container common-round-border" v-if="commentList.length > 0">
      <div class="total-comment">{{ commentList.length }}条评论</div>
      <div class="comment-item-list-container">
        <CommentItem v-for="item in commentList" :key="item.id" :comment="item"
                     @replySuccess="getComments(page, size)"
                     :parentInfo="{parentCommentId: item.id, replyCommentId: null, replyUserName: null}"/>
      </div>
    </div>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "../plugins/constants";
import PublishComment from "./PublishComment";
import CommentItem from "./CommentItem";

export default {
  name: "ArticleComment",
  components: {CommentItem, PublishComment},
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
      }
    }
  },
  methods: {
    async getComments(page, size) {
      const {data: response} = await this.$axios.get('/comment/list/' + this.$route.params.id, {
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
  created() {
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
