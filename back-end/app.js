const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const jwt = require('koa-jwt')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const template = require("koa-html-template")

const initSwagger = require('./utils/swagger')
const { tokenConfig } = require('./config/config')
const { routerResponse, initRouterControllersAsync } = require('./utils/initRouterControllers');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  formLimit:"10mb",
  jsonLimit:"10mb",
  enableTypes:['json', 'form', 'text']
}))

// cors跨域
app.use(cors())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(__dirname + '/public/build-editor'))
app.use(template('/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(routerResponse())

// error
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (e.status === 401) {
      ctx.fail('token 无效，请重新登陆', 401)
    } else {
      ctx.fail(e, 500)
    }
    console.error('server error', e)
  }
})

// jwt
app.use(jwt({
  secret: tokenConfig.privateKey,
  getToken: tokenConfig.getToken
}).unless({
  path: tokenConfig.unless
}))

// Swagger
initSwagger(app)

// Router
initRouterControllersAsync().then((router) => {
  app.use(router.routes(), router.allowedMethods());
})

// error-handling
app.on('error', (err, ctx) => {
  ctx.fail(err, 500)
  console.error('server error', err, ctx)
});

module.exports = app
