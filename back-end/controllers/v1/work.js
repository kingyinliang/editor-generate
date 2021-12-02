const db = require('../../db')

/* 用正则表达式实现html编码（转义）（另一种写法） */
const html2Escape = (str) => {
  const arrEntiries = { '\\': '&quot;' }
  return str.replace(/[<>&"]/g, (c) => { return arrEntiries[c] })
}

/* 用正则表达式实现html解码（反转义）（另一种写法） */
const escape2Html = (str) => {
  const arrEntiries = { '&lt;': '<', '&gt;': '>', '&nbsp': ' ', '&amp;': '&', '&quot;': '"' }
  return str.replace(/(&lt|&gt|&nbsp|&amp|&quot);/ig, (c) => { return arrEntiries[c] })
}

module.exports = {
    query: async ctx => {
      if (ctx.query.id) {
            let work = await db.query(`select * from works where id=${ctx.query.id}`)
            if (work.length) {
              let pages = work[0].pages || '{}'
              let datasources = work[0].datasources || '[]'
              pages = pages.replace(/(&slash);/g, '\\')
              datasources = datasources.replace(/(&slash);/g, '\\')
              work[0].pages = JSON.parse(pages)
              work[0].datasources = JSON.parse(datasources)
              work[0].dialog = JSON.parse(work[0].dialog)
              ctx.success({
                  work: work[0]
              })
            } else {
                ctx.success({
                })
            }
        } else {
            let works = await db.query('select * from works')
            works.forEach(item => {
                item.pages = JSON.parse(item.pages)
            })
            ctx.success({
                works
            })
        }

    },
    insert: async ctx => {
        const params = ctx.request.body
        const sql = `insert into works(title,is_template,description,dialog,pages)
        values('${params.title}',${params.is_template},'${params.description}','${JSON.stringify(params.dialog)}','${JSON.stringify(params.pages)}')`
        let works = await db.query(sql)
        ctx.success({
            id: works.insertId
        })
    },
    update: async ctx => {
        const params = ctx.request.body
        let pages = JSON.stringify(params.pages)
        let datasources = JSON.stringify(params.datasources)
        pages = pages.replace(/[\\]/g, '&slash;')
        datasources = datasources.replace(/[\\]/g, '&slash;')
        const sql = `update works set
        title='${params.title}',is_template=${params.is_template},description='${params.description}',dialog='${JSON.stringify(params.dialog)}',pages='${pages}',datasources='${datasources}'
        where id=${params.id}`
        let works = await db.query(sql)
        ctx.success({
            works
        })
    },
    preview: async ctx => {
        if (ctx.query.id) {
            let work = await db.query(`select * from works where id=${ctx.query.id}`)
            if (work.length) {
                work[0].pages = JSON.parse(work[0].pages)
                work[0].dialog = JSON.parse(work[0].dialog)
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
    },
    editor: async ctx => {
      await ctx.template("build-editor/index.html")
    }
}
