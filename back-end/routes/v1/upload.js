module.exports = app => ({
  'post /picture': app.controllers.v1.upload.picture,
})