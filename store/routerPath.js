const actions = {}

const mutations = {
  setCurrentRouterPath(state, value) {
    state.routerPath = value
  }
}

const state = () => ({
  routerPath: ''
})

export default {
  actions,
  mutations,
  state
}
