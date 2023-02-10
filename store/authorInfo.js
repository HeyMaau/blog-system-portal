const actions = {}

const mutations = {
  setAuthorInfo(state, value) {
    state.authorInfo = value
  }
}

const state = () => ({
  authorInfo: {}
})

export default {
  actions,
  mutations,
  state
}
