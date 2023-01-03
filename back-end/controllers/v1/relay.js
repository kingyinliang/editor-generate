const axios = require('axios');
const axiosService = axios.create({
  timeout: 1000 * 60 * 3 // 请求超时时间
});
axiosService.interceptors.response.use(response => {
  return Promise.resolve(response)
})
module.exports = {
  activityInfo: async ctx => {
    let option = {
      url: 'http://test2.api.gy-idc.com/api/app/v2/prizes/activity_info',
      method: 'GET'
    }
    option.headers = {}
    option.headers['org-id'] = 5
    option.headers['app-type'] = 5
    const { data } = await axiosService(option)
    ctx.success({ data: data.data })
  }
}