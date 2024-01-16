import {getFetchConfig} from "~/utils/fetch-config";

export function getSearchListApi(params: object) {
  return $fetch('/search', getFetchConfig('get', params, null))
}
