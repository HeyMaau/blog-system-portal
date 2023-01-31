const actions = {}

const mutations = {
  addCategoryList(state, value) {
    state.categoryList = value
  }
}

const state = () => ({
  categoryList: []
})

export default {
  actions,
  mutations,
  state
}
