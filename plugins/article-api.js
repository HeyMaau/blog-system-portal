import {ARTICLE_SUMMARY_LENGTH} from "./constants";

export function trimArticleSummary(list) {
  list.forEach(item => {
    if (item.content.length > ARTICLE_SUMMARY_LENGTH) {
      item.content = item.content.slice(0, ARTICLE_SUMMARY_LENGTH) + '...'
    }
  })
}
