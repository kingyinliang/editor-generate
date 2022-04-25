const router = require('koa-router')()
const jsdoc = require('swagger-jsdoc')
const { koaSwagger } = require('koa2-swagger-ui')
const pkg = require('../package.json')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'generate API文档',
    version: pkg.version,
    description: 'generate 接口文档',
  },
  host: 'localhost:3000',
  basePath: '/',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  apis: ['./controllers/v1/*.js'],
};
const swaggerSpec = jsdoc(options)
// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
})

const initSwagger = (app) => {
  app.use(router.routes(), router.allowedMethods())
  app.use(koaSwagger({
    routePrefix: '/swagger', // api文档访问地址
    swaggerOptions: {
      url: '/swagger.json', // example path to json
    }
  }))
}

module.exports = initSwagger
