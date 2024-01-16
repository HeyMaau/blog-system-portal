import {getFetchConfig} from "~/utils/fetch-config";

export function getAdminInfoApi() {
  return $fetch('/user/admin', getFetchConfig('get', null, null))
}
