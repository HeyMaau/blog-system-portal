import {getFetchConfig} from "~/utils/fetch-config";

export function getThinkingListApi(params: object) {
  return $fetch('/thinking/list', getFetchConfig('get', params, null))
}

export function getThinkingApi(id: string | string[]) {
  return $fetch('/thinking/' + id, getFetchConfig('get', null, null))
}
