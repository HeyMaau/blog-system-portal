<template>
  <div class="thinking-list" id="thinking-list-container">
    <div class="thinking-list-item" v-for="item in thinkingList" :key="item.id">
      <div class="author-info-area">
        <img :src="item.user.avatar" class="author-avatar">
        <div class="author-name-sign-area">
          <span class="author-name">{{ item.user.userName }}</span>
          <span class="author-sign">{{ item.user.sign }}</span>
        </div>
      </div>
      <div class="content-area">
        <div class="thinking-title">{{ item.title }}</div>
        <div class="thinking-content">{{ item.content }}</div>
      </div>
      <ThinkingPictureList :id="`thinking-picture-list-${item.id}`" class="picture-area" :images="item.images"
                           :limit="4"
                           v-if="item.images !== null && item.images.length !== 0"
                           @click.native.capture="initPicViewer(item.id)"/>
      <div class="update-time">发布于 {{ item.updateTime }}</div>
      <div class="operating-area" v-if="!hideCommentButton">
        <button class="add-comment-button" @click="handleClickComment(item.id)">
          <span class="button-icon">
            <svg t="1692067380859" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="4629" width="16" height="16"><path
              d="M510.563278 65.99404c-246.704798 0-446.604594 199.925379-446.604594 446.579011 0 246.648516 199.899796 446.573895 446.63427 446.573895 246.619864 0 446.574918-199.925379 446.574918-446.573895C957.166849 265.918395 757.212818 65.99404 510.563278 65.99404zM260.657578 583.67032c-39.266305 0-71.098291-31.830963-71.100338-71.097268l0 0 0-0.001023c0 0 0-0.001023 0-0.001023 0-39.267329 31.833009-71.100338 71.100338-71.100338 39.267329 0 71.100338 31.833009 71.100338 71.100338S299.924907 583.67032 260.657578 583.67032zM511.420809 583.67032c-39.267329 0-71.100338-31.833009-71.100338-71.100338s31.833009-71.100338 71.100338-71.100338c39.267329 0 71.100338 31.833009 71.100338 71.100338S550.688137 583.67032 511.420809 583.67032zM765.455549 583.67032c-39.267329 0-71.100338-31.833009-71.100338-71.100338s31.833009-71.100338 71.100338-71.100338c39.267329 0 71.100338 31.833009 71.100338 71.100338S804.722878 583.67032 765.455549 583.67032z"
              fill="#76839b" p-id="4630"></path></svg>
          </span>
          {{ commentNumList[item.id] === 0 ? '添加评论' : `${commentNumList[item.id]}条评论` }}
        </button>
      </div>
      <ThinkingComment :id="item.id" v-show="commentListState[item.id] || alwaysShowComment" class="thinking-comment"
                       @onCommentUpdate="updateAddCommentButton"/>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import {URL_IMAGE} from "~/utils/constants";
import Viewer from "viewerjs";
import ThinkingComment from "./ThinkingComment.vue";
import ThinkingPictureList from "./ThinkingPictureList.vue";
import {nextTick, shallowReactive, watch} from "vue";

const props = defineProps({
  thinkingList: Array,
  alwaysShowComment: Boolean,
  hideCommentButton: Boolean
})

let picViewer = null
let commentListState = shallowReactive({})
const commentNumList = shallowReactive({})
let lastInitPicViewerID = ''

watch(props.thinkingList, () => {
  initCommentListState()
})

function handleClickComment(id) {
  commentListState[id] = !commentListState[id]
}

function initCommentListState() {
  commentListState = shallowReactive({})
  props.thinkingList.forEach(value => {
    commentListState[value.id] = false
  })
}

function updateAddCommentButton(id, data) {
  commentNumList[id] = data.length
}

function initPicViewer(id) {
  if (id === lastInitPicViewerID) {
    return
  }
  if (picViewer !== null) {
    picViewer.destroy()
  }
  nextTick(() => {
    picViewer = new Viewer(document.getElementById(`thinking-picture-list-${id}`), {
      inline: false,
      title: false,
      toolbar: true,
      transition: false,
      navbar: false,
      loop: false
    })
    lastInitPicViewerID = id
  })
}


</script>

<style scoped>

.thinking-list {
  padding-bottom: 10px;
}

.thinking-list-item {
  padding: 16px 20px;
  position: relative;
}

.thinking-list-item::after {
  border-bottom: 1px solid #f6f6f6;
  content: "";
  margin: 0 20px;
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
}

.author-info-area {
  display: flex;
}

.author-name-sign-area {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 14px;
}

.author-avatar {
  height: 38px;
  width: 38px;
  box-sizing: border-box;
  border-radius: 2px;
  margin: 0;
}

.author-name {
  font-size: 15px;
  line-height: 1.1;
  color: #444;
  font-synthesis: style;
  font-weight: 600;
}

.author-sign {
  color: #646464;
  font-size: 15px;
  line-height: 1.6;
}

.content-area {
  margin-top: 9px;
  line-height: 1.67;
}

.thinking-title {
  color: #056DE8;
  font-weight: bold;
}

.thinking-content {
  white-space: pre-wrap;
}

.picture-area {
  margin-top: 10px;
  width: 100%;
}

.update-time {
  margin-top: 10px;
  color: #8590a6;
  font-size: 14px;
}

.operating-area {
  padding: 5px 0;
  margin-bottom: -10px;
}

.button-icon {
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
}

.add-comment-button {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: #8590a6;
  border: none;
  background-color: transparent;
  line-height: 32px;
  padding: 0;
  cursor: pointer;
}

.thinking-comment {
  margin-top: 10px;
  width: 100%;
}

</style>
