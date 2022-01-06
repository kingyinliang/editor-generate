import vClickOutside from 'v-click-outside'
import { quillEditor } from 'vue-quill-editor'
import PropTypes from './plugin-props'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import '@/assets/scss/text-overwrite-quil-snow-theme.scss'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  name: 'k-text',
  data () {
    return {
      canEdit: false,
      innerText: this.text || '双击修改文字'
    }
  },
  props: {
    text: PropTypes.input({ label: '内容', defaultValue: '双击修改文字', visible: false }),
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: 'rgba(0, 0, 0, 0)' }),
    editorMode: PropTypes.input({
      defaultValue: 'preview', // 可选值: preview/edit
      label: '模式',
      visible: false
    })
  },

  render(){
    const canEdit = this.canEdit && this.editorMode === 'edit'
    const previewText = <div class="ql-snow"><div domPropsInnerHTML={this.text} class="k-text ql-editor ql-container"></div></div>
    const style = {
      position: 'relative',
      color: `${this.color} !important`,
      textDecoration: 'none',
      backgroundColor: this.backgroundColor || 'rgba(255, 255, 255, 0.2)',
      lineHeight: `${this.lineHeight}em`
    }
    return (
      <div
        style={style}
        onDblclick={e => {
          this.canEdit = true
          e.stopPropagation()
        }}
        onMousedown={e => {
          if (this.canEdit) { e.stopPropagation() }
        }}
        v-click-outside={() => {
          this.canEdit = false
        }}
        onKeydown={event => {
          const key = event.keyCode || event.charCode
          if (key === 8 || key === 46) {
            event.stopPropagation()
          }
        }}
      >
        {
          !canEdit ?
            previewText :
            <quillEditor
              content={this.text}
              options={{
                modules: {
                  // toolbar: '#toolbar-wrapper'
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'], // 切换按钮
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }], // 主题默认下拉，使用主题提供的值
                    [{ 'align': [] }],
                    ['clean'], // 清除格式
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
                    // https://github.com/quilljs/quill/issues/1208
                  ]
                },
                theme: 'snow'
              }}
              onChange={({ html }) => {
                this.$emit('input', {
                  value: html,
                  pluginName: 'k-text'
                })
              }}>
            </quillEditor>
        }
      </div>
    )
  }
}
