<template>
  <div>
    <MessageBoard class="message-board" v-show="!submitted" @submit-success="onSubmitSuccess"/>
    <el-result class="feedback-result" icon="success" title="提交成功" :subTitle="submitSuccessTips"
               v-show="submitted"/>
  </div>
</template>

<script>
let timer

export default {
  name: "index",
  data() {
    return {
      submitted: false,
      submitSuccessTips: '',
      countDown: 3
    }
  },
  methods: {
    onSubmitSuccess() {
      this.submitted = true
      this.refreshSubmitSuccessTips()
      timer = setInterval(this.refreshSubmitSuccessTips, 1000);
    },
    refreshSubmitSuccessTips() {
      this.submitSuccessTips = `将在${this.countDown}秒后跳转至首页`
      if (this.countDown === 0) {
        clearInterval(timer)
        this.$router.push('/')
      }
      this.countDown--
    }
  }
}
</script>

<style scoped>

.message-board {
  width: 700px;
  margin-top: 50px;
}

.feedback-result {
  margin-top: 100px;
}

</style>
