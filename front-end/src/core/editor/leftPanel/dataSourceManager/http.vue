<template>
  <el-form
    ref="ruleForm"
    :model="form"
    :rules="rules"
    label-width="100px"
  >
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="数据地址" prop="url">
      <el-input v-model="form.url" type="textarea" />
    </el-form-item>
    <el-form-item label="触发方式">
      <el-radio-group v-model="form.refreshType">
        <el-radio label="once">单次触发</el-radio>
        <el-radio label="fixed-frequency">定时更新</el-radio>
      </el-radio-group>
      <el-input-number v-model="form.refreshInterval" :disabled="form.refreshType !== 'fixed-frequency'" style="margin-left: 20px"/>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="更多配置" name="0">
        <el-form-item label="数据处理">
          <codemirror ref="codeEditor" v-model="form.handler" />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
  export default {
    name: 'http',
    props: {
      dataSource: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        form: {
          name: '',
          url: '',
          refreshType: 'once',
          refreshInterval: '',
          handler: `function handler(deps) {\ndebugger\nreturn deps.data\n}`,
          ...this.dataSource
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getForm () {
        return {
          ...this.form,
          url: this.form.url.trim(), // 移除\n\r 空格等
          handler: this.$refs.codeEditor.codemirror.getValue()
        }
      },
      checkForm () {
        return new Promise((resolve, reject) => {
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              resolve(this.getForm())
            } else {
              console.log('error submit!!')
              reject(valid)
            }
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
