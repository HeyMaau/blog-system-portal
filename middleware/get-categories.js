import {CODE_SUCCESS} from "../plugins/constants";

export default async function ({$axios, store}) {
  const {data: response} = await $axios.get('website_info/categories')
  if (response.code === CODE_SUCCESS) {
    store.commit('articleCategory/addCategoryList', response.data)
  }
}
