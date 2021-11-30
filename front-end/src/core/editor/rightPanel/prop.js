import {mapState} from "vuex";
import {getVM} from '@/utils'

export default {
  name: 'PropEditor',
  props: {
    realEditingElement: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    ...mapState('editor', {
      stateEditingElement: state => state.editingElement
    }),
    editingElement () {
      return this.realEditingElement || this.stateEditingElement
    }
  },
  render(h) {
    if (!this.editingElement) return (<div>请选择一个元素</div>)
    const vm = getVM(this.editingElement.name)
    const props = vm.$options.props
    return (
      <el-form class="right_prop_form" size="mini" inline={false}>
        {
          Object.entries(props).filter(([propKey, propConfig]) => {
            console.log(propKey)
            const isVisible = Object.prototype.hasOwnProperty.call(propConfig, 'visible') ? propConfig.visible : true
            return isVisible && propConfig.editor && !propConfig.editor.custom
          }).map(([key, value]) => {
            const editor = value.editor
            const data = {
              props: {
                ...editor.props,
                value: this.editingElement.pluginProps[key]
              },
              on: {
                input: val => {
                  this.editingElement.pluginProps[key] = val.target ? val.target.value : val
                },
                change: (e) => {
                  this.editingElement.pluginProps[key] = e.target ? e.target.value : e
                }
              }
            }
            return (
              <el-form-item
                label={editor.label+':'}
              >
                { h(editor.type, data) }
              </el-form-item>
            )
          })
        }
      </el-form>
    )
  }
}
