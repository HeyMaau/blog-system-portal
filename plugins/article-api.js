import {ARTICLE_SUMMARY_LENGTH} from "./constants";

export function trimArticleSummary(list) {
  list.forEach(item => {
    if (item.content.length > ARTICLE_SUMMARY_LENGTH) {
      item.content = item.content.slice(0, ARTICLE_SUMMARY_LENGTH) + '...'
    }
  })
}

export function trimArticleContent4Description(content) {
  let plainText = removeHTMLTag(removeHeader(content))
  if (plainText.length > ARTICLE_SUMMARY_LENGTH) {
    return plainText.slice(0, ARTICLE_SUMMARY_LENGTH)
  }
  return plainText
}

function removeHeader(str) {
  str = str.replace(/<[hH]1>.*<\/[hH]1>/g, '')
  str = str.replace(/<[hH]2>.*<\/[hH]2>/g, '')
  str = str.replace(/<[hH]3>.*<\/[hH]3>/g, '')
  return str
}

function removeHTMLTag(str) {
  str = str.replace(/<\/?[^>]*>/g, '') // 去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n') // 去除行尾空白
  str = str.replace(/\n(\n)*( )*(\n)*\n/g, '\n'); //去除多余空行
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
