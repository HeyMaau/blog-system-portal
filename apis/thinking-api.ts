import {getFetchConfig} from "~/utils/fetch-config";

export function getThinkingListApi(params: object) {
  return $fetch('/thinking/list', getFetchConfig('get', params, null))
}
