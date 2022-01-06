const path = require('path');
const fs = require('fs');
const Router = require('koa-router');

const getName = (arr, app, controller) => {
    let obj = app
    arr.forEach((item, index) =>{
        if(index === arr.length-1){
            obj[item] = controller
        } else if (obj[item]) {
            obj = obj[item]
        } else {
            obj[item] = {}
            obj = obj[item]
        }
    })
    return app
}

const routerResponse = (option={}) => {
    return async function(ctx,next){
        ctx.success = function (data) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code : option.successCode || 200,
                msg : option.successMsg || 'success',
                data : data
            }
        }
        ctx.fail = function (msg,code) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code : code || option.failCode || 99,
                msg : msg || option.successMsg || 'fail',
            }
        }
        await next()
    }
}

const readDirFile = async (dir, cb) => {
  const url = path.resolve(__dirname, dir);

  const files = fs.readdirSync(url)

  for (let filename of files) {
    let fileDir = path.join(dir, filename);

    const stats = fs.statSync(fileDir)

    if(stats.isDirectory()){
      await readDirFile(fileDir, cb)
    }

    if (path.extname(filename) === '.js') {
      filename = filename.replace('.js', '');
      fileDir = fileDir.replace('routes', '');
      fileDir = fileDir.replace('.js', '');
      const code= require(`${url}/${filename}`);
      cb(fileDir, code)
    }
  }
}

const initRouterControllersAsync = async () => {
  let controllers = {}
  await readDirFile('controllers', (filename, code) =>{
    filename = filename.replace(/\\/g, '.')
    controllers = getName(filename.split('.'), controllers, code)
  })
  const router = new Router();
  await readDirFile('routes', (filename, routes) => {
    routes = typeof routes === 'function' ? routes(controllers) : routes;
    filename = filename.replace(/\\/g, '/')
    const prefix = /index/g.test(filename) ? filename.replace('/index', '') : `${filename}`;
    Object.keys(routes).forEach(key =>{
      const [method, path] = key.split(' ');
      console.log(`正在映射地址: ${method.toLocaleUpperCase()}  ${prefix}${path}`);
      router[method](prefix + path, routes[key]);
    })
  })
  return router
}


module.exports = { initRouterControllersAsync, routerResponse }
