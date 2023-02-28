<template>
  <div>
    <MessageBoard class="message-board" v-show="!submitted" @submit-success="onSubmitSuccess"/>
    <el-result class="feedback-result" icon="success" title="提交成功" :subTitle="submitSuccessTips"
               v-show="submitted"/>
  </div>
</template>

<script>
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
