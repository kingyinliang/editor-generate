module.exports = app => ({
  'post /login': app.controllers.v1.user.login,
  'post /register': app.controllers.v1.user.register,
})
