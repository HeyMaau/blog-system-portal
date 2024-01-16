import {getFetchConfig} from "~/utils/fetch-config";

export function getCommentListApi(thinkingID: string, commentType: string, params: object) {
  return $fetch(`/comment/list/${commentType}/${thinkingID}`,
    getFetchConfig('get', params, null))
}

export function publishCommentApi(body: object) {
  return $fetch('/comment', getFetchConfig('post', null, body))
}
