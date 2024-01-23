export function getAudioListApi(params: object) {
  return $fetch('/audio/list', getFetchConfig('get', params, null))
}
