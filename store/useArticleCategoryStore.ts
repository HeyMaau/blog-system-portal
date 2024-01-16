import {defineStore} from "pinia";

export const useArticleCategoryStore = defineStore('articleCategory', {
  state: () => {
    return {
      categoryList: []
    }
  },
  actions: {
    // @ts-ignore
    addCategoryList(value) {
      this.categoryList = value
    }
  },
  getters: {}
})
