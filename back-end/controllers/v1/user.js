const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../db')
const { tokenConfig } = require('../../config/config')

const salt = bcrypt.genSaltSync(10)

const querySql = (data) => `select * from user where username=${db.escape(data.username)}`
/**
 * @swagger
 * /v1/user/login:
 *   post:
 *     tags: [用户]
 *     description: 登录接口
 *     requestBody:
 *       description: 用户信息
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: 请求成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/definitions/Res'
 *                 - properties:
 *                     data:
 *                       type: object
 *                       allOf:
 *                         - $ref: '#/definitions/User'
 *                         - properties:
 *                             id:
 *                               type: string
 *                             token:
 *                               type: string
 */
const login = async ctx => {
  const data = ctx.request.body
  if (!data.username || !data.password) {
    return ctx.fail('请求参数错误', 400)
  }
  const queryRes = await db.query(querySql(data))
  if (!queryRes.length) {
    return ctx.fail('用户不存在', 400)
  }
  let user = queryRes[0]
  const pwdTag = bcrypt.compareSync(data.password, user.password)
  if (pwdTag) {
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 30
    }, tokenConfig.privateKey)
    user.token = token
    delete user.password
    return ctx.success(queryRes[0])
  } else {
    return ctx.fail('密码错误', 400)
  }
}
/**
 * @swagger
 * /v1/user/register:
 *   post:
 *     tags: [用户]
 *     description: 注册接口
 *     requestBody:
 *       description: 用户信息
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: 请求成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/definitions/Res'
 *                 - properties:
 *                     data:
 *                       type: object
 */
const register = async ctx => {
  const data = ctx.request.body
  if (!data.username || !data.password) {
    return ctx.fail('请求参数错误', 400)
  }
  const queryRes = await db.query(querySql(data))
  if (queryRes.length) {
    return ctx.fail('用户已存在', 400)
  }
  const hashPwd = bcrypt.hashSync(data.password, salt)
  const insertSql = `insert into user(id,username,password)
        values((select replace(uuid(),'-','')),'${data.username}','${hashPwd}')`
  const insertRes = await db.query(insertSql)
  ctx.success(insertRes)
}

module.exports = {
  login,
  register
}
