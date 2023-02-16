import {CODE_SUCCESS} from "../plugins/constants";

export default async function ({$axios, store}) {
  const {data: response} = await $axios.get('user/admin')
  if (response.code === CODE_SUCCESS) {
    store.commit('authorInfo/setAuthorInfo', response.data)
  }
}
