import axios from 'axios'
import DS_ENUM, { REFRESH_ENUM, REFRESH_DEFAULT_INTERVAL } from 'core/editor/leftPanel/dataSourceManager/config'

export default class DataSource {
  constructor(ds) {
    this.init(ds)
  }

  init (ds) {
    this.id = ds.id || +new Date()
    this.name = ds.name
    this.url = ds.url
    this.type = ds.type
    this.refreshType = ds.refreshType || REFRESH_ENUM.code2value.ONCE
    this.refreshInterval = ds.refreshInterval || REFRESH_DEFAULT_INTERVAL
    this.handler = ds.handler || ''
    this.resHandler = this.getHandlerFn(ds.handler)
  }

  getHandlerFn (handlerStr) {
    return new Function(`return ${handlerStr}`)()
  }

  _request () {
    const ds = this
    return new Promise((resolve) => {
      ds.loading = true
      axios(ds.url).then(response => {
        ds.updated = +new Date()
        ds.loading = false
        const storage = {
          [ds.name]: typeof ds.resHandler === 'function' ? ds.resHandler(response) : response.data
        }
        import('@/store/index.js').then(coreStore => {
          const store = coreStore.default
          store.commit('editor/updateDS', storage)
          resolve()
        })
      })
    })
  }

  request () {
    return this._request().then(() => {
      if (this.refreshType === REFRESH_ENUM.code2value.FIXED) {
        setInterval(() => {
          this._request()
        }, this.refreshInterval * 1000)
      }
    })
  }

  static dispatchRequest (work) {
    const dsList = (work.datasources || []).filter(ds => ds.type === DS_ENUM.code2value.HTTP_API)
    if (!dsList.length) return
    this.requestQueueLen = dsList.length
    this.loading = true
    dsList.forEach(ds => {
      new DataSource(ds).request().then(() => {
        this.requestQueueLen--
        if (this.requestQueueLen === 0) {
          this.loading = false
        }
      })
    })
  }
}
