<template>
  <div class="main-page-container">
    <ArticleList :articleList="articleList" class="article-list"/>
    <div class="website-info-column">
      <InfoCard :avatarSrc="avatarUrl" :title="authorInfoData.data.userName">
        <div class="info-item">
          <span class="info-icon">
            <svg t="1675052094498" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="3459" width="1.2em" height="1.2em"><path
              d="M743.936 357.376H280.064a34.304 34.304 0 0 1 0-68.608h463.872a34.304 34.304 0 0 1 0 68.608z"
              fill="#444444" p-id="3460"></path><path
              d="M555.008 838.656H468.992v-154.624a34.304 34.304 0 0 1 34.304-34.304h17.408a34.304 34.304 0 0 1 34.304 34.304v154.624z"
              fill="#00B65F" p-id="3461"></path><path
              d="M838.144 958.464H185.856a69.0688 69.0688 0 0 1-69.12-68.608v-140.8a71.68 71.68 0 0 1 23.04-51.712 7.0656 7.0656 0 0 1 2.048-1.536L296.96 576.512c-31.232-38.4-51.712-73.728-56.832-144.384-1.536-20.992-11.264-198.656-5.12-272.384A103.2192 103.2192 0 0 1 337.92 65.024h352.256a103.1168 103.1168 0 0 1 102.912 94.208c6.656 72.704-3.072 248.832-5.632 273.92-8.192 80.896-29.696 114.688-57.856 146.432l152.576 116.224a7.0656 7.0656 0 0 0 2.048 1.536 68.4032 68.4032 0 0 1 23.552 51.712v140.8a69.8368 69.8368 0 0 1-69.632 68.608zM185.344 749.056v140.8h652.8l0.512-140.8-180.736-137.728a33.0752 33.0752 0 0 1-13.312-24.576 32.4608 32.4608 0 0 1 9.216-26.112l10.24-11.264c31.744-33.792 48.128-50.688 55.296-123.392 2.56-26.624 11.264-197.12 5.632-261.12a34.0992 34.0992 0 0 0-34.304-31.232H337.92a34.56 34.56 0 0 0-34.304 31.744c-5.632 69.12 4.096 244.224 5.12 262.144 4.608 62.464 20.992 81.92 60.928 128.512l3.072 3.584a34.2528 34.2528 0 0 1 8.192 26.112 33.6896 33.6896 0 0 1-13.312 23.552l-182.272 139.776z"
              fill="#444444" p-id="3462"></path></svg>
          </span>
          <span>{{ authorInfoData.data.major }}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">
            <svg t="1675065253517" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="7749" width="1.2em" height="1.2em"><path
              d="M682.215454 981.446137c-25.532318 0-42.553863-17.021545-42.553864-42.553864v-165.960067c4.255386-34.043091-8.510773-59.575409-29.787704-80.852341-12.766159-12.766159-17.021545-29.787704-8.510773-42.553864 4.255386-17.021545 21.276932-25.532318 34.043091-29.787704 123.406204-12.766159 238.301635-55.320023 238.301635-255.323181 0-46.80925-17.021545-93.6185-51.064636-131.916976-12.766159-12.766159-12.766159-29.787704-8.510772-42.553864 12.766159-34.043091 12.766159-68.086182 4.255386-102.129272-21.276932 4.255386-55.320023 17.021545-110.640045 55.320022-8.510773 8.510773-21.276932 8.510773-34.043091 4.255387-89.363113-25.532318-187.236999-25.532318-276.600112 0-12.766159 4.255386-25.532318 4.255386-38.298477-4.255387C307.741455 104.836549 269.442978 92.07039 248.166047 87.815004c-8.510773 34.043091-8.510773 68.086182 4.255386 102.129272 4.255386 17.021545 4.255386 34.043091-8.510773 42.553864-34.043091 38.298477-51.064636 85.107727-51.064636 131.916976 0 200.003158 114.895431 242.557022 238.301635 255.323181 17.021545 0 29.787704 12.766159 34.043091 29.787704 4.255386 17.021545 0 34.043091-8.510773 42.553864-21.276932 21.276932-29.787704 46.80925-29.787704 76.596954v165.960068c0 25.532318-17.021545 42.553863-42.553863 42.553863s-42.553863-17.021545-42.553864-42.553863v-72.341568c-127.66159 21.276932-182.981613-51.064636-221.28009-97.873886-17.021545-21.276932-29.787704-38.298477-46.80925-42.553864-21.276932-4.255386-38.298477-29.787704-29.787704-51.064636 4.255386-21.276932 29.787704-38.298477 51.064636-29.787704 42.553863 12.766159 68.086182 42.553863 93.6185 72.341568 34.043091 46.80925 63.830795 80.852341 153.193908 63.830795v-4.255386c0-25.532318 4.255386-55.320023 12.766159-76.596955-119.150818-25.532318-246.812408-102.129272-246.812408-327.664748 0-63.830795 21.276932-123.406204 59.575409-170.215454-17.021545-59.575409-12.766159-114.895431 12.766159-170.215454 4.255386-12.766159 12.766159-21.276932 25.532318-25.532318 17.021545-4.255386 72.341568-12.766159 187.236999 59.575409 93.6185-21.276932 191.492386-21.276932 280.855499 0 110.640045-72.341568 170.215454-63.830795 187.236999-59.575409 12.766159 4.255386 21.276932 12.766159 25.532319 25.532318 21.276932 55.320023 25.532318 110.640045 12.766159 165.960067 38.298477 46.80925 59.575409 106.384659 59.575408 170.215454 0 242.557022-144.683136 306.387817-246.812408 331.920135 8.510773 25.532318 12.766159 55.320023 12.766159 80.852341V938.892273c0 25.532318-17.021545 42.553863-42.553863 42.553864z"
              p-id="7750" fill="#515151"></path></svg>
          </span>
          <a :href="authorInfoData.data.hubSite" target="_blank">{{ authorInfoData.data.hubSite }}</a>
        </div>
        <div class="info-item">
          <span class="info-icon">
            <svg t="1675065384813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="8466" width="1.2em" height="1.2em"><path
              d="M422.5 837.5c-7.7 0-15.4-2.9-21.2-8.8L196.2 623.6c-11.7-11.7-11.7-30.7 0-42.4s30.7-11.7 42.4 0l205.1 205.1c11.7 11.7 11.7 30.7 0 42.4-5.9 5.8-13.6 8.8-21.2 8.8zM825 435c-7.7 0-15.4-2.9-21.2-8.8L598.7 221.1c-11.7-11.7-11.7-30.7 0-42.4s30.7-11.7 42.4 0l205.1 205.1c11.7 11.7 11.7 30.7 0 42.4-5.9 5.8-13.6 8.8-21.2 8.8z"
              fill="#515151" p-id="8467"></path><path
              d="M127.8 925.4c-7.9 0-15.6-3.1-21.3-8.9-6.9-7-10-17-8.2-26.6 0.1-0.6 12-63.9 26.9-129.5 8.9-38.9 17.1-71.1 24.5-95.8 13.8-46.2 22.7-59.6 30.2-67.1L650.3 127c38.4-38.4 100.5-38.9 138.4-1l110.1 110.1c18.4 18.4 28.3 43 28.1 69.3-0.3 26.1-10.6 50.6-29.1 69.1L427.4 844.9c-7.6 7.6-21 16.5-67.6 30-24.8 7.2-57.3 15.3-96.4 23.9-66.1 14.6-129.7 26-130.4 26.1-1.7 0.4-3.4 0.5-5.2 0.5zM223 639.2c-2.2 3.4-14.9 26.2-40.5 139.5-6.5 28.9-12.4 57.1-16.8 79 22.2-4.3 50.6-10 79.8-16.4 113.6-24.8 136.7-37.3 140.2-39.6L855.4 332l21.2 21.2-21.2-21.2c15-15 15.5-39.1 1-53.5L746.3 168.4c-14.5-14.5-38.5-14-53.5 1L223 639.2z m163.1 162.3zM223.3 638.8z"
              fill="#515151" p-id="8468"></path></svg>
          </span>
          <span>{{ authorInfoData.data.sign }}</span>
        </div>
      </InfoCard>
      <ClientOnly>
        <AudioPlayer class="audio-player"/>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import {CODE_SUCCESS} from "~/utils/constants";
import ArticleList from "@/components/ArticleList.vue";
import InfoCard from "@/components/InfoCard.vue";
import {getClientHeight, getScrollHeight, getScrollTop} from "~/utils/infinite-scroll";
import {trimArticleSummary} from "~/utils/article-util.js";
import {RecordEvent, RecordPage} from "~/utils/StatisticsConstants";
import {useCommitVisitRecord} from "~/apis/statistics-api.ts";
import {getArticleListApi} from "~/apis/article-api.ts";
import {useAsyncData} from "#app";
import {onBeforeMount, onMounted, onUnmounted, ref, shallowRef} from "vue";
import {getAdminInfoApi} from "~/apis/user-api.ts";

let currentPage = 1
let currentSize = 8
let isLoading = ref(false)
let articleList = shallowRef([])
let noMore = ref(true)


async function windowScroll() {
  //如果满足公式则，确实到底了
  if (getScrollTop() + getClientHeight() + 20 >= getScrollHeight()) {
    if (!noMore.value && !isLoading.value) {
      isLoading.value = true
      const response = await getArticleListApi({
        page: ++currentPage,
        size: currentSize
      })
      if (response.code === CODE_SUCCESS) {
        noMore.value = response.data.noMore
        response.data.data.forEach(item => {
          articleList.value.push(item)
        })
        trimArticleSummary(articleList.value)
      }
      isLoading.value = false
    }
  }
}

const {data: articleListData} = await useAsyncData('articleList', () =>
  getArticleListApi({
    page: 1,
    size: 8
  })
)
let list
if (articleListData.value.code === CODE_SUCCESS) {
  list = articleListData.value.data.data
  trimArticleSummary(list)
}
articleList.value = list
noMore.value = articleListData.value.data.noMore

const {data: authorInfoData} = await useAsyncData('authorInfo', () =>
  getAdminInfoApi()
)
const avatarUrl = ref(import.meta.env.VITE_PUBLIC_IMAGE_BASE_URL + authorInfoData.value.data.avatar)

onMounted(() => {
  window.addEventListener('scroll', windowScroll, true)
  useCommitVisitRecord(RecordPage.PAGE_NAME_MAIN_PAGE, null, RecordEvent.EVENT_NAME_VISIT)
})

onUnmounted(() => {
  window.removeEventListener("scroll", windowScroll)
})

onBeforeMount(() => {
  document.title = '首页 - 卧卷'
})

</script>

<style src="~/assets/article.css" scoped/>
<style src="~/assets/page.css" scoped/>
<style src="~/assets/info-card.css" scoped/>
<style scoped>

.audio-player {
  margin-top: 10px;
}

</style>
