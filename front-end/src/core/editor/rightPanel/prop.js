import { mapState,mapActions } from 'vuex';
import {getVM} from '@/utils'
import BoxModelEditor from './box-model'

export default {
  name: 'PropEditor',
  props: {
    realEditingElement: {
      type: Object,
      default: () => null
    }
  },
  data: () => ({
    loadCustomEditorFlag: false,
    editorPositionConfig: [
      { type: 'el-input', label: '上', key: 'top' },
      { type: 'el-input', label: '左', key: 'left' },
      { type: 'el-input', label: '宽', key: 'width' },
      { type: 'el-input', label: '高', key: 'height' }
    ]
  }),
  components: {
    BoxModelEditor
  },
  computed: {
    ...mapState('editor', {
      stateEditingElement: state => state.editingElement
    }),
    editingElement () {
      return this.realEditingElement || this.stateEditingElement
    }
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement',
      'setElementPosition'
    ]),
    renderEditorPositionConfig(h) {
      const _this = this
      const commonStyle = this.editingElement.commonStyle
      return <el-form inline={true} size='mini'>
        {
          this.editorPositionConfig.map(item => {
            const { type, label, key } = item
            const data = {
              style: {
                width: '100px'
              },
              props: {
                type: 'number',
                value: commonStyle[key],
                placeholder: `请输入${key}`,
                formatter: value => `${label} ${value}`
              },
              on: {
                input (e) {
                  const value = e
                  _this.onPositionChange(key, value)
                }
              }
            }
            return (
              <el-form-item label={label}>
                {
                  h(type, data)
                }
              </el-form-item>
            )
          })
        }
      </el-form>
    },
    onPositionChange (key, value) {
      this.setElementPosition({
        [key]: Number(value)
      })
    }
  },
  render(h) {
    if (!this.editingElement) return (<div>请选择一个元素</div>)
    const vm = getVM(this.editingElement.name)
    const props = vm.$options.props
    return (
      <el-collapse value={[1]}>
        <el-collapse-item name={0} title="通用样式">
          {
            this.stateEditingElement ? this.renderEditorPositionConfig(h) : ''
          }
          <BoxModelEditor />
        </el-collapse-item>
        <el-collapse-item name={1} title="属性设置">
          <el-form className="right_prop_form" size="mini" inline={false}>
            {
              // eslint-disable-next-line
              Object.entries(props).filter(([propKey, propConfig]) => {
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
                    label={editor.label + ':'}
                  >
                    {h(editor.type, data)}
                  </el-form-item>
                )
              })
            }
          </el-form>
        </el-collapse-item>
      </el-collapse>
    )
  }
}
