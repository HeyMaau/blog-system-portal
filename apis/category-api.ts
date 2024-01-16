import {getFetchConfig} from "~/utils/fetch-config";

export function getCategoryListApi() {
  return $fetch('/website_info/categories', getFetchConfig('get', null, null))
}
