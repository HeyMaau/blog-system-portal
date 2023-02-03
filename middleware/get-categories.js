import {CODE_SUCCESS} from "../plugins/constants";

export default async function ({$axios, store}) {
  const {data: response} = await $axios.get('website_info/categories')
  if (response.code === CODE_SUCCESS) {
    store.commit('articleCategory/addCategoryList', response.data)
  }
  /*const api = $axios.create()
  api.setBaseURL('https://1c5aee02-8885-4a4f-8950-592b37b961ae.mock.pstmn.io/portal/')
  const {data: response} = await api.get('website_info/categories')
  store.commit('articleCategory/addCategoryList', response.data)*/
}
