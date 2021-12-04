import { mapState, mapActions } from 'vuex'
import { DS } from '@/store/modules/editor/data-source'
import HttpForm from './http'
import StaticForm from './static'
import CsvForm from './csv'
import DS_ENUM from './config'

export default {
  name: 'dataSourceManager',
  data: () => ({
    activeName: 0,
    dialog: false,
    activeDataSource: {
      type: DS_ENUM.code2value.HTTP_API
    }
  }),
  computed: {
    ...mapState('editor', [
      'work'
    ])
  },
  methods: {
    ...mapActions('editor', ['dataSourceManager']),
    // 显示弹窗
    handleSelectDataSourceType(menu) {
      this.activeDataSource = {}
      this.activeDataSource.type = menu.value
      this.dialog = !this.dialog
    },
    // 新增
    renderAddAction() {
      return (
        <el-dropdown trigger="click" style="right: 25px; position: absolute;" oncommand={this.handleSelectDataSourceType}>
          <el-button type="text" icon="el-icon-plus" onClick={e => e.stopPropagation()} />
          <el-dropdown-menu slot="dropdown">
            {
              DS_ENUM.options.map(type => (
                <el-dropdown-item command={type}>{type.label}</el-dropdown-item>
              ))
            }
          </el-dropdown-menu>
        </el-dropdown>
      )
    },
    renderDataSourceList() {
      if (this.work.datasources.length) {
        return (
          this.work.datasources.map(ds => {
            return (
              <el-card class="dataSource__card">
                <div slot="header" style="display: flex">
                  <div style="flex: 1"></div>
                  <div>
                    <el-button style="padding: 3px 0" type="text" icon="el-icon-delete" onclick={()=>this.manageDataSource('delete', ds)} />
                    <el-button style="padding: 3px 0" type="text" icon="el-icon-setting" onclick={()=>this.manageDataSource('edit', ds)} />
                    <el-button style="padding: 3px 0" type="text" icon="el-icon-refresh" disabled={ds.type !== DS_ENUM.code2value.HTTP_API} onclick={() => this.updateDs(ds)} />
                  </div>
                </div>
                {ds.name? <div>名称：{ds.name}</div>:''}
                {
                  ds.type === DS_ENUM.code2value.HTTP_API?
                    <div>
                      {ds.url? <div>地址：{ds.url}</div>:''}
                      {ds.refreshType? <div>触发方式：{ds.refreshType === 'once' ? '单次触发' : '定时更新'}</div>:''}
                    </div> : <div></div>
                }
              </el-card>
            )
          })
        )
      } else {
        return <el-empty description="无数据源"></el-empty>
      }
    },
    updateDs(ds) {
      ds.request().then(() => {
        this.$message.success(`数据源: ${ds.name} 更新成功`)
      })
    },
    viewDataCenter() {
      return (
        <el-popover
          trigger="click"
          title="数据中心预览"
        >
          <el-button slot="reference" icon="el-icon-view" type="text" style="float: right" />
          <codemirror
            value={JSON.stringify(DS, null, 2)}
            onblur={cm => {
              DS.DS = JSON.parse(cm.getValue().replace(/[\r\n\s+]/g, '')).DS
            }}
            style="min-width: 500px;"
          />
        </el-popover>
      )
    },
    // 弹窗
    renderDialog() {
      return (
        <el-dialog
          title={`${this.$t('editor.sidebar.dataSource')} - ${this.activeDataSource.type? DS_ENUM.options.find(it => it.value === this.activeDataSource.type).label : ''}`}
          visible={this.dialog}
          {...{on: {'update:visible': val => {this.dialog = val}}}}
          width="600"
        >
          {this.renderForm()}
          <div style="text-align: right;margin-top: 10px">
            <el-button type="primary" onclick={this.submitForm}>确认</el-button>
            <el-button onclick={()=> this.dialog = false}>取消</el-button>
          </div>
        </el-dialog>
      )
    },
    // 表单
    renderForm () {
      if (this.dialog) {
        switch (this.activeDataSource.type) {
          case DS_ENUM.code2value.HTTP_API:
            return <HttpForm ref="form" dataSource={this.activeDataSource} type={this.activeDataSource.type} />
          case DS_ENUM.code2value.STATIC:
            return <StaticForm ref="form" dataSource={this.activeDataSource} type={this.activeDataSource.type} />
          case DS_ENUM.code2value.CSV:
            return <CsvForm ref="form" dataSource={this.activeDataSource} type={this.activeDataSource.type} />
        }
      } else {
        return ''
      }
    },
    submitForm() {
      this.$refs.form.checkForm().then(dataSourceForm => {
        const actionType = dataSourceForm.id ? 'edit' : 'add'
        this.manageDataSource(actionType, dataSourceForm)
        this.activeDataSource = {}
      })
    },
    manageDataSource(actionType, ds) {
      this.dataSourceManager({
        type: actionType,
        value: {...ds }
      })
      if (actionType === 'add' || actionType === 'edit') {
        this.activeDataSource = { ...ds }
        this.dialog = !this.dialog
      }
    }
  },
  render() {
    return (
      <div>
        <el-collapse vModel={this.activeName} accordion>
          <el-collapse-item name={0}>
            <template slot="title">
              <span>{this.$t('editor.sidebar.dataSource')}</span>
              {this.renderAddAction()}
            </template>
            {this.renderDataSourceList()}
            {this.viewDataCenter()}
          </el-collapse-item>
        </el-collapse>
        {this.renderDialog()}
      </div>
    )
  }
}
