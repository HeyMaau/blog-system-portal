<template>
  <div>
    <div class="message-board-container">
      <textarea placeholder="请输入标题（选填）" class="input-area input-title" v-model="title"></textarea>
      <div class="input-content-container">
      <textarea placeholder="请输入留言内容（必填）" class="input-area input-content" v-model="content"
                ref="inputContentRef"></textarea>
      </div>
      <div class="input-email-container">
        <textarea placeholder="您的邮箱（选填）" class="input-area input-email" v-model="email"></textarea>
      </div>
    </div>
    <div class="button-container">
      <el-button type="primary" :disabled="disableButton" @click="submitFeedback">提交反馈</el-button>
    </div>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "~/utils/constants";
import {submitFeedbackApi} from "~/apis/feedback-api.ts";
import {ElMessage} from "element-plus";

export default {
  name: "MessageBoard",
  data() {
    return {
      title: '',
      content: '',
      email: '',
      disableButton: true,
    }
  },
  methods: {
    adjustTextareaHeight(event) {
      this.$refs.inputContentRef.style.height = 'inherit'
      this.$refs.inputContentRef.style.height = event.target.scrollHeight + 'px'
    },
    async submitFeedback() {
      const response = await submitFeedbackApi({
        title: this.title,
        content: this.content,
        email: this.email
      })
      if (response.code === CODE_SUCCESS) {
        this.$emit('submit-success')
      } else {
        ElMessage.error(response.message)
      }
    }
  },
  watch: {
    content(newValue) {
      this.disableButton = newValue.trim().length === 0
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

.message-board-container {
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background: white;
}

.input-area {
  border: none;
  resize: none;
  outline: none;
  padding: 0;
  width: 100%;
}

.input-title {
  height: 45px;
  font-size: 32px;
  font-weight: 600;
  font-synthesis: style;
  line-height: 1.4;
  margin: 16px 0;
}

.input-content-container, .input-email-container {
  border-top: 1px solid hsla(0, 0%, 7%, .08);
}

.input-content {
  margin: 30px 0;
  font-size: 16px;
  line-height: 1.6;
  min-height: 200px;
  overflow: hidden;
}

.input-email {
  margin-top: 10px;
  font-size: 16px;
  height: 30px;
  line-height: 20px;
}

.button-container {
  margin-top: 10px;
  display: flex;
  justify-content: right;
}

.input-title, .input-content, .input-email {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;;

}

</style>
