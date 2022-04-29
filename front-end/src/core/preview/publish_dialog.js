import { updateWorks } from '@/utils/api.js'
import {mapState} from "vuex";

export default {
  name: 'PublishDialog',
  props: ['visible'],
  computed:{
    ...mapState('editor', ['work']),
  },
  methods: {
    publish() {
      updateWorks(this.work).then(({data}) => {
        if(data.code === 200) {
          this.$message({
            message: '成功',
            type: 'success'
          });
          this.$emit('update:visible', false)
        }
      })
    }
  },
  render(){
    return(
      <el-dialog
        title={this.$t('editor.header.publish')}
        visible={this.visible}
        before-close={() => this.$emit('update:visible', false)}
      >
        <el-form label-width="100px">
          <el-form-item label={this.$t('publish.title')}>
            <el-input vModel={this.work.title} />
          </el-form-item>
          <el-form-item label={this.$t('publish.description')}>
            <el-input vModel={this.work.description} />
          </el-form-item>
          <el-form-item label={this.$t('publish.publish')}>
            <el-radio vModel={this.work.is_publish} label={1}>{this.$t('publish.yes')}</el-radio>
            <el-radio vModel={this.work.is_publish} label={0}>{this.$t('publish.no')}</el-radio>
          </el-form-item>
          <el-form-item label={this.$t('publish.created')}>
            <span>{this.work.created_at}</span>
          </el-form-item>
          <el-form-item label={this.$t('publish.updated')}>
            <span>{this.work.updated_at}</span>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button onClick={() => {this.$emit('update:visible', false)}}>
              {this.$t('button.cancel')}
            </el-button>
            <el-button type="primary" onClick={this.publish}>
              {this.$t('button.confirm')}
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    )
  }
}
