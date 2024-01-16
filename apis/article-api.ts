import {getFetchConfig} from "~/utils/fetch-config";

export function getArticleListApi(params: object) {
  return $fetch('/article/list', getFetchConfig('get', params, null))
}

export function getFullArticleApi(articleID: string) {
  return $fetch('/article/' + articleID, getFetchConfig('get', null, null))
}
