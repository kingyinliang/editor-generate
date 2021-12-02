import Page from './page'
import DataSource from './data-source'

class Work {
  constructor(work = {}) {
    this.id = work.id
    this.title = work.title || '标题'
    this.description = work.description || '描述'
    this.pages = work.pages || [new Page()]
    this.dialog = work.dialog || []
    this.height = work.height || 667
    this.is_template = false
    this.datasources = (work.datasources || []).map(item => new DataSource(item))
  }
}

export default Work
