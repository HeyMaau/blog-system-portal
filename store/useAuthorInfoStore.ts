import {defineStore} from "pinia";

export const useAuthorInfoStore = defineStore('authorInfo', {
  state: () => {
    return {
      authorInfo: {}
    }
  },
  actions: {
    // @ts-ignore
    setAuthorInfo(value) {
      this.authorInfo = value
    }
  },
  getters: {}
})
