const dayjs = require('dayjs')
const db = require('../../db')

const escapeReg = {'\\': '&slash;', '\'': '&squot;'}
// 出库转义
const escapeStr = (str) => {
  for (const escapeRegKey in escapeReg) {
    const reg = eval(`/${escapeReg[escapeRegKey]}/g`)
    str = str.replace(reg, () => { return `${escapeRegKey}` })
  }
  return str
}
// 进库前转义
const strEscape = (str) => {
  for (const escapeRegKey in escapeReg) {
    const reg = eval(`/[\\${escapeRegKey}]/g`)
    str = str.replace(reg, () => { return escapeReg[escapeRegKey] })
  }
  return str
}

/**
 * @swagger
 * /v1/work/query:
 *  get:
 *    tags: [作品]
 *    description: 查询作品接口
 *    parameters:
 *      - name: id
 *        description: 作品id
 *        in: query
 *        type: string
 *    responses:
 *      200:
 *        description: 请求成功
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/definitions/Res'
 *                - properties:
 *                    data:
 *                      type: object
 *                      properties:
 *                        work:
 *                          type: object
 *                          $ref: '#/definitions/Work'
 *                        works:
 *                          type: array
 *                          items:
 *                            $ref: '#/definitions/Work'
 */
const query = async ctx => {
  if (ctx.query.id) {
    let work = await db.query(`select * from works where id=${ctx.query.id}`)
    if (work.length) {
      work[0].pages = JSON.parse(escapeStr(work[0].pages || '[]'))
      work[0].datasources = JSON.parse(escapeStr(work[0].datasources || '[]'))
      work[0].dialog = JSON.parse(escapeStr(work[0].dialog || '[]'))
      work[0].created_at = dayjs(work[0].created_at).format('YYYY-MM-DD HH:mm:ss')
      work[0].updated_at = dayjs(work[0].updated_at).format('YYYY-MM-DD HH:mm:ss')
      ctx.success({
        work: work[0]
      })
    } else {
      ctx.success({
      })
    }
  } else {
    let works = await db.query(`select * from works where user_id='${ctx.state.user.id}'`)
    works.forEach(work => {
      work.pages = JSON.parse(escapeStr(work.pages || '[]'))
      work.datasources = JSON.parse(escapeStr(work.datasources || '[]'))
      work.dialog = JSON.parse(escapeStr(work.dialog || '[]'))
      work.created_at = dayjs(work.created_at).format('YYYY-MM-DD HH:mm:ss')
      work.updated_at = dayjs(work.updated_at).format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.success({
      works
    })
  }

}
/**
 * @swagger
 * /v1/work/insert:
 *   post:
 *     tags: [作品]
 *     description: 新增作品接口
 *     requestBody:
 *       description: 作品信息
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Work'
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
 *                      type: object
 *                      properties:
 *                        id:
 *                           type: integer
 */
const insert = async ctx => {
  const params = ctx.request.body
  const sql = `insert into works(user_id,title,is_template,description,dialog,pages)
        values('${ctx.state.user.id}','${params.title}',${params.is_template},'${params.description}','${JSON.stringify(params.dialog)}','${JSON.stringify(params.pages)}')`
  let works = await db.query(sql)
  ctx.success({
    id: works.insertId
  })
}
/**
 * @swagger
 * /v1/work/update:
 *   post:
 *     tags: [作品]
 *     description: 修改作品接口
 *     requestBody:
 *       description: 作品信息
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Work'
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
 *                      type: object
 *                      properties:
 *                        works:
 *                          type: array
 *                          items:
 *                            $ref: '#/definitions/Work'
 */
const update = async ctx => {
  const params = ctx.request.body
  let pages = strEscape(JSON.stringify(params.pages))
  let datasources = strEscape(JSON.stringify(params.datasources))
  const sql = `update works set
        title='${params.title}',is_template=${params.is_template},is_publish=${params.is_publish},description='${params.description}',dialog='${JSON.stringify(params.dialog)}',pages='${pages}',datasources='${datasources}'
        where id=${params.id}`
  let works = await db.query(sql)
  ctx.success({
    works
  })
}

const preview = async ctx => {
  if (ctx.query.id) {
    let work = await db.query(`select * from works where id=${ctx.query.id}`)
    if (work.length) {
      work[0].pages = JSON.parse(escapeStr(work[0].pages || '[]'))
      work[0].datasources = JSON.parse(escapeStr(work[0].datasources || '[]'))
      work[0].dialog = JSON.parse(escapeStr(work[0].dialog || '[]'))
      await ctx.render('index',{
        work: work[0]
      })
    } else {
      ctx.success({
      })
    }
  } else {
    ctx.fail({
      data: '没有id'
    })
  }
}

const editor = async ctx => {
  await ctx.template("build-editor/index.html")
}

module.exports = {
    query,
    insert,
    update,
    preview,
    editor
}
