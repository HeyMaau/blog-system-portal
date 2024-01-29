export function getFriendLinkListApi(params: object) {
    return $fetch('/friend_link/list', getFetchConfig('get', params, null))
}
