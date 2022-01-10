import { mapState } from 'vuex'
import defaultScript from './defaultScript'

export default {
  name: 'ScriptEditor',
  computed: {
    ...mapState('editor', ['editingElement']),
    methodList () {
      return (this.editingElement && this.editingElement.methodList) || []
    },
    script () {
      return (this.editingElement && this.editingElement.script) || []
    }
  },
  data:() => ({
    dialog: false,
    index: 0,
    triggerList: [
      {
        value: 'click',
        label: '点击'
      },
      {
        value: 'change',
        label: '改变'
      },
      {
        value: 'mouseover',
        label: '移入'
      },
      {
        value: 'mouseout',
        label: '移出'
      },
      {
        value: 'keydown',
        label: '按下键盘'
      },
      {
        value: 'load',
        label: '完成加载'
      }
    ],
    code: ''
  }),
  methods: {
    delScript(row, index) {
      this.script.splice(index, 1)
    },
    addScript(row, index) {
      if (row) {
        this.code = row
        this.index = index
      } else {
        this.code = defaultScript
        this.index = null
      }
      this.dialog = true
    },
    addMethods() {
      this.methodList.push({
        trigger: '',
        fnName: ''
      })
    },
    submitForm() {
      if (this.index === null) {
        this.script.push(this.code)
      } else {
        this.script.splice(this.index, 1, this.code)
      }
      this.dialog = false
    },
    renderMethodTable() {
      return this.methodList.map(item => {
        return (
          <div>
            <span>事件：</span>
            <el-select vModel={item.trigger} style="width:95px;margin-right: 10px;" size="mini" >
              {
                this.triggerList.map(item => {
                  return <el-option label={item.label} value={item.value} />
                })
              }
            </el-select>
            <span>执行：</span>
            <el-input vModel={item.fnName} size="mini" style="width:85px"></el-input>
          </div>
        )
      })
    },
    renderScriptTable() {
      return <div>
        脚本
        <el-table data={this.script}>
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column
            label="脚本"
            {...{
              scopedSlots: {
                default: scope => `脚本${scope.$index+1}`
              }
            }}
          />
          <el-table-column
            label="操作"
            width="80px"
            {...{
              scopedSlots: {
                default: scope => {
                  return <div>
                    <el-button type="text" icon="el-icon-delete" size="big" onClick={()=>this.delScript(scope.row, scope.$index)}/>
                    <el-button type="text" icon="el-icon-edit" size="big" onClick={()=>this.addScript(scope.row, scope.$index)}/>
                  </div>
                }
              }
            }}
          />
        </el-table>
      </div>

    }
  },
  render() {
    if (!this.editingElement) return (<div>请选择一个元素</div>)
    return (
      <div>
        <el-button type="text" icon="el-icon-plus" onClick={()=>this.addScript()} >
          新增脚本
        </el-button>
        <el-button type="text" icon="el-icon-plus" onClick={()=>this.addMethods()} >
          新增事件
        </el-button>
        {this.renderScriptTable()}
        {this.renderMethodTable()}
        <el-dialog
          title="新增-修改脚本"
          visible={this.dialog}
          {...{on: {'update:visible': val => {this.dialog = val}}}}
        >
          <codemirror
            vModel={this.code}
            style="min-width: 500px;"
          />
          <div style="text-align: right;margin-top: 10px">
            <el-button type="primary" onclick={this.submitForm}>确认</el-button>
            <el-button onclick={()=> this.dialog = false}>取消</el-button>
          </div>
        </el-dialog>
      </div>
    )
  }
}
