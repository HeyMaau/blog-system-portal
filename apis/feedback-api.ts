import {getFetchConfig} from "~/utils/fetch-config";

export function submitFeedbackApi(body: object) {
  return $fetch('/feedback', getFetchConfig('post', null, body))
}
