export default ({ app }) => {
  app.router.afterEach((to, from) => {
    console.log(from.path,11111111111)
  })
}