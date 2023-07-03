import {ARTICLE_SUMMARY_LENGTH} from "./constants";

export function trimArticleSummary(list) {
  list.forEach(item => {
    if (item.content.length > ARTICLE_SUMMARY_LENGTH) {
      item.content = item.content.slice(0, ARTICLE_SUMMARY_LENGTH) + '...'
    }
  })
}

export function trimArticleContent4Description(content) {
  let plainText = removeHTMLTag(content)
  if (plainText.length > ARTICLE_SUMMARY_LENGTH) {
    return plainText.slice(0, ARTICLE_SUMMARY_LENGTH)
  }
  return plainText
}

function removeHTMLTag(str) {
  str = str.replace(/<\/?[^>]*>/g, '') // 去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n') // 去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
  str = str.replace(/ /ig, '') // 去掉
  const arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'} // 转义符换成普通字符
  str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
    return arrEntities[t]
  })
  return str
}

export function createMetaKeywords(labels) {
  return labels.split('-').join(',')
}
