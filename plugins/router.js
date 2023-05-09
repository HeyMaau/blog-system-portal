export default function ({app}) {
  app.router.afterEach(to => {
    app.store.commit('routerPath/setCurrentRouterPath', to.path)
  })
}
