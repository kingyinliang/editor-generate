module.exports = app => ({
  'get /activityInfo': app.controllers.v1.relay.activityInfo,
})