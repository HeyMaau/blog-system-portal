<script setup lang="ts">

import {getAudioListApi} from "~/apis/audio-api";
import type {BlogAudio} from "~/pojo/BlogAudio";
//@ts-ignore
import {Howl} from "https://jsd.onmicrosoft.cn/npm/howler@2.2.4/+esm";
import {onBeforeUnmount} from "vue";
import {useCommitVisitRecord} from "~/apis/statistics-api";
import {RecordComponent, RecordEvent} from "~/utils/StatisticsConstants";

const currentTime = ref('00:00')
const totalTime = ref('00:00')
const audioList = ref<BlogAudio[]>([])
const currentAudioIndex = ref(0)
const howlInsList: Howl[] = []
const loadErrorList: number[] = []
const currentCoverUrl = ref('')
const currentAudioName = ref('加载中...')
const currentAudioArtist = ref('')

let page = 1
let size = 10

function getAudioList() {
  getAudioListApi({
    page,
    size
  }).then(response => {
    if (response.code === CODE_SUCCESS) {
      audioList.value = response.data.data
      setCurrentHeaderInfo()
    }
  })
}

getAudioList()

function setCurrentHeaderInfo(): void {
  currentCoverUrl.value = audioList.value[currentAudioIndex.value].coverUrl
  currentAudioName.value = audioList.value[currentAudioIndex.value].name
  currentAudioArtist.value = audioList.value[currentAudioIndex.value].artist
}

const isPlaying = ref(false)
const sliderMaxLength = ref(100)
const sliderProgress = ref(0)
let timerID: any
const loadingTipsVisibility = ref(false)
const loadingTipsText = ref('加载中')

function initHowl(index: number): void {
  loadingTipsVisibility.value = true
  loadingTipsText.value = '加载中'
  handleHowlStopOrEnd()
  totalTime.value = '00:00'
  const howl = new Howl({
    src: audioList.value[currentAudioIndex.value].audioUrl,
    preload: false
  })
  howl.on('load', () => {
    setSliderInfo(howl)
    howl.play()
    loadingTipsVisibility.value = false
  })
  howl.on('play', () => {
    isPlaying.value = true
    setHowlSeekTimer()
  })
  howl.on('pause', () => {
    isPlaying.value = false
    clearInterval(timerID)
  })
  howl.on('stop', () => {
    handleHowlStopOrEnd()
  })
  howl.on('seek', () => {
  })
  howl.on('end', () => {
    handleHowlStopOrEnd()
  })
  howl.on('loaderror', () => {
    howlLoadError(index)
  })
  howl.on('playerror', () => {
    howlLoadError(index)
  })
  howlInsList[currentAudioIndex.value] = howl
  howl.load()
}

function handleHowlStopOrEnd(): void {
  isPlaying.value = false
  sliderProgress.value = 0
  currentTime.value = "00:00"
  clearInterval(timerID)
}

function setSliderInfo(howl: Howl): void {
  let duration = howl.duration();
  sliderMaxLength.value = duration
  totalTime.value = convertTime(duration)
}

function howlLoadError(index: number): void {
  if (index === currentAudioIndex.value) {
    loadingTipsVisibility.value = true
    loadingTipsText.value = '播放失败'
  }
  loadErrorList.push(index)
}

function seekTimerRunner(): void {
  let seek = howlInsList[currentAudioIndex.value].seek()
  sliderProgress.value = seek
  currentTime.value = convertTime(seek)
}

function setHowlSeekTimer() {
  seekTimerRunner()
  timerID = setInterval(seekTimerRunner, 1000);
}

function convertTime(time: number): string {
  let min = Math.floor(time / 60) % 60
  let sec = Math.floor(time) % 60
  let minStr = `${min}`
  let secStr = `${sec}`
  if (min < 10) {
    minStr = '0' + min
  }
  if (sec < 10) {
    secStr = '0' + sec
  }
  return `${minStr}:${secStr}`
}

function playOrPause() {
  const howl = howlInsList[currentAudioIndex.value]
  if (howl === undefined || howl === null) {
    initHowl(currentAudioIndex.value)
    useCommitVisitRecord(null, RecordComponent.COMPONENT_NAME_AUDIO_PLAYER, RecordEvent.EVENT_NAME_CLICK_PLAY)
    return
  }
  handleHowlState(howl, true)
}

function handleHowlState(howl: Howl, isPlayButton: boolean) {
  switch (howl.state()) {
    case "unloaded":
      howl.load()
      loadingTipsText.value = '加载中'
      loadingTipsVisibility.value = true
      if (isPlayButton) {
        useCommitVisitRecord(null, RecordComponent.COMPONENT_NAME_AUDIO_PLAYER, RecordEvent.EVENT_NAME_CLICK_PLAY)
      }
      break
    case "loaded":
      if (howl.playing()) {
        howl.pause()
        if (isPlayButton) {
          useCommitVisitRecord(null, RecordComponent.COMPONENT_NAME_AUDIO_PLAYER, RecordEvent.EVENT_NAME_CLICK_PAUSE)
        }
      } else {
        howl.play()
        if (isPlayButton) {
          useCommitVisitRecord(null, RecordComponent.COMPONENT_NAME_AUDIO_PLAYER, RecordEvent.EVENT_NAME_CLICK_PLAY)
        }
      }
      break
    case "loading":
      if (loadErrorList.some(value => {
        return value === currentAudioIndex.value
      })) {
        howl.unload()
        howl.load()
        currentCoverUrl.value += `?${new Date().getTime()}`
        loadingTipsText.value = '加载中'
        loadingTipsVisibility.value = true
        loadErrorList.splice(loadErrorList.indexOf(currentAudioIndex.value), 1);
        if (isPlayButton) {
          useCommitVisitRecord(null, RecordComponent.COMPONENT_NAME_AUDIO_PLAYER, RecordEvent.EVENT_NAME_CLICK_RETRY)
        }
      }
      break
  }
}

function sliderSeekChange(value: any): void {
  const howl = howlInsList[currentAudioIndex.value]
  if (howl.state() !== 'loaded') {
    return
  }
  howl.seek(value)
}

function playNext(): void {
  useCommitVisitRecord(null, RecordComponent.COMPONENT_NAME_AUDIO_PLAYER, RecordEvent.EVENT_NAME_CLICK_NEXT)
  if (currentAudioIndex.value + 1 === audioList.value.length) {
    showNoMoreOrPreVideoTips('没有下一首了', true)
    return
  }
  stopCurrentHowlBeforePlayNextOrPre()
  const nextHowl = howlInsList[++currentAudioIndex.value]
  if (nextHowl === undefined || nextHowl === null) {
    initHowl(currentAudioIndex.value)
  } else {
    setSliderInfo(nextHowl)
    handleHowlState(nextHowl, false)
  }
  setCurrentHeaderInfo()
}

function playPre(): void {
  useCommitVisitRecord(null, RecordComponent.COMPONENT_NAME_AUDIO_PLAYER, RecordEvent.EVENT_NAME_CLICK_PRE)
  if (currentAudioIndex.value === 0) {
    showNoMoreOrPreVideoTips('没有上一首了', false)
    return
  }
  stopCurrentHowlBeforePlayNextOrPre()
  const preHowl = howlInsList[--currentAudioIndex.value]
  if (preHowl === undefined || preHowl === null) {
    initHowl(currentAudioIndex.value)
  } else {
    setSliderInfo(preHowl)
    handleHowlState(preHowl, false)
  }
  setCurrentHeaderInfo()
}

function stopCurrentHowlBeforePlayNextOrPre(): void {
  const howl = howlInsList[currentAudioIndex.value]
  if (howl === undefined || howl === null) {
    return
  }
  switch (howl.state()) {
    case "loading":
      howl.unload()
      break
    case "loaded":
      howl.stop()
      break
  }
}

const noMoreVideoTipsVisibility = ref(false)
const noPreVideoTipsVisibility = ref(false)
const noMoreOrPreVideoTipsContent = ref('没有下一首了')

function showNoMoreOrPreVideoTips(tips: string, noMore: boolean) {
  noMoreOrPreVideoTipsContent.value = tips
  if (noMore) {
    noMoreVideoTipsVisibility.value = true
    setTimeout(() => {
      noMoreVideoTipsVisibility.value = false
    }, 1500)
  } else {
    noPreVideoTipsVisibility.value = true
    setTimeout(() => {
      noPreVideoTipsVisibility.value = false
    }, 1500)
  }
}

onBeforeUnmount(() => {
  howlInsList.forEach(value => {
    value.unload()
  })
})

</script>

<template>
  <div class="audio-player-container">
    <div class="audio-player-header">
      <img :src="currentCoverUrl" class="audio-player-header-cover" referrerpolicy="no-referrer"
           loading="lazy">
      <div class="audio-player-header-info">
        <span class="audio-player-header-info-name">{{ currentAudioName }}</span>
        <span class="audio-player-header-info-artist">{{ currentAudioArtist }}</span>
      </div>
    </div>
    <div class="audio-player-control">
      <el-tooltip
        effect="dark"
        :content="noMoreOrPreVideoTipsContent"
        placement="top"
        :visible="noPreVideoTipsVisibility"
      >
        <div @click="playPre">
          <svg t="1705549140943" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2665" width="25" height="25">
            <path
              d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z"
              fill="#231815" p-id="2666"></path>
          </svg>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="loadingTipsText"
        placement="top"
        :visible="loadingTipsVisibility"
      >
        <div @click="playOrPause">
          <svg v-show="!isPlaying" t="1705549354735" class="icon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="4673" width="25" height="25">
            <path
              d="M780.8 475.733333L285.866667 168.533333c-27.733333-17.066667-64 4.266667-64 36.266667v614.4c0 32 36.266667 53.333333 64 36.266667l492.8-307.2c29.866667-14.933333 29.866667-57.6 2.133333-72.533334z"
              fill="#040000" p-id="4674"></path>
          </svg>
          <svg v-show="isPlaying" t="1705569775950" class="icon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="5822" width="25" height="25">
            <path
              d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"
              fill="#2c2c2c" p-id="5823"></path>
          </svg>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="noMoreOrPreVideoTipsContent"
        placement="top"
        :visible="noMoreVideoTipsVisibility"
      >
        <div @click="playNext">
          <svg t="1705549171696" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="3669" width="25" height="25">
            <path
              d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z"
              fill="#231815" p-id="3670"></path>
          </svg>
        </div>
      </el-tooltip>
    </div>
    <div class="audio-player-progress">
      <span class="audio-player-progress-current-time">{{ currentTime }}</span>
      <div class="audio-player-progress-slider">
        <el-slider v-model="sliderProgress" size="small" :show-tooltip="false" :max="sliderMaxLength"
                   @change="sliderSeekChange"/>
      </div>
      <span class="audio-player-progress-total-time">{{ totalTime }}</span>
    </div>
  </div>
</template>

<style scoped>

.audio-player-container {
  height: 120px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.audio-player-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.audio-player-header-cover {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}

.audio-player-header-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow: hidden;
}

.audio-player-header-info-name {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.audio-player-header-info-artist {
  font-size: 12px;
  color: #8a8a8a;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.audio-player-control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 60px;
}

.audio-player-progress {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.audio-player-progress-current-time, .audio-player-progress-total-time {
  font-size: 12px;
}

.audio-player-progress-slider {
  margin: 0 10px;
  width: 100%;
}

:deep(.el-slider__button) {
  width: 15px;
  height: 15px;
}

</style>
