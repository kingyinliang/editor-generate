import Vue from 'vue'
import PreviewCanvas from 'core/preview'
import DialogCanvas from 'core/preview/dialog_canvas.js'
import { pluginsList } from 'core/plugins'
import DataSource from 'core/models/data-source'
import KComponents from 'k-generate-components'
import Element from 'core/models/element'
import Page from 'core/models/page'
import Dialog from 'core/models/dialog'

import '@/assets/scss/index.scss';
import '@/assets/scss/editor.scss'
import '@/assets/scss/plugins.scss'
import '@/assets/icon/iconfont.css'
import 'animate.css'

const Engine = {
  name: 'Engine',
  created() {
    DataSource.dispatchRequest(window.__work)
  },
  render(){
    let work = window.__work;
    work.pages = work.pages.map(page => {
      page.elements = page.elements.map(element => new Element(element))
      return new Page(page)
    })
    work.dialog = work.dialog.map(dialog => {
      dialog.elements = dialog.elements.map(element => new Element(element))
      return new Dialog(dialog)
    })
    return (
      <div class='work_container'>
        <PreviewCanvas elements={work.pages[0].elements} height={work.pages[0].height}/>
        <DialogCanvas dialogs={work.dialog}/>
      </div>
    )
  }
}

Vue.use(KComponents)

const install = function (Vue) {
  Vue.component(Engine.name, Engine)
  pluginsList.forEach(plugin => {
    Vue.component(plugin.name, plugin.component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Engine
}
