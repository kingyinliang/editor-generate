import Vue from 'vue'

import KUploadEditor from './k-upload-editor'
import KSelectEditor from './k-select-editor'
import KRadioEditor from './k-radio-editor'
import KColorsPanelEditor from './k-colors-panel-editor'
import KExcelEditor from './k-excel-editor'
import KColorPicker from './k-color-picker'

import VueCodemirror from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror, {
  options: {
    tabSize: 2,
    mode: 'text/javascript',
    theme: 'base16-dark',
    lineNumbers: true,
    line: true
  },
  events: ['scroll']
})

Vue.component(KUploadEditor.name, KUploadEditor)
Vue.component(KSelectEditor.name, KSelectEditor)
Vue.component(KRadioEditor.name, KRadioEditor)
Vue.component(KColorsPanelEditor.name, KColorsPanelEditor)
Vue.component(KExcelEditor.name, KExcelEditor)
Vue.component(KColorPicker.name, KColorPicker)
