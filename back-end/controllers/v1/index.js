// 响应体 Res
/**
 * @swagger
 * definitions:
 *   Res:
 *     properties:
 *       code:
 *         type: integer
 *         default: 200
 *       msg:
 *         type: string
 *         default: '请求成功'
 */
// 用户 User
/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       username:
 *         type: string
 *         description: 用户名
 *       password:
 *         type: string
 *         description: 密码
 */
// 作品 Work
/**
 * @swagger
 * definitions:
 *   Work:
 *     properties:
 *       id:
 *         type: integer
 *         description: 作品唯一id
 *       title:
 *         type: string
 *         description: 作品标题
 *       description:
 *         type: string
 *         description: 作品描述
 *       is_template:
 *         type: integer
 *         description: 作品是否为模板
 *       pages:
 *         type: array
 *         description: 作品内页面集合
 *         items:
 *           type: object
 *       dialog:
 *         type: array
 *         description: 作品内弹窗集合
 *         items:
 *           type: object
 *       datasources:
 *         type: array
 *         description: 作品数据接口
 *         items:
 *           type: object
 *       updated_at:
 *         type: string
 *         description: 作品修改日期
 *       created_at:
 *         type: string
 *         description: 作品创建日期
 */

module.exports = {
    index: async ctx => {
        ctx.body = 'index index'
    },
    detail: async ctx => {
        ctx.body = 'index detail'
    },
}
