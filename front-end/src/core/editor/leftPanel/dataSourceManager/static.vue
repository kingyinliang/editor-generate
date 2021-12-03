<template>
  <el-form
    ref="ruleForm"
    :model="form"
    :rules="rules"
    label-width="100px"
  >
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="更多配置" name="0">
        <el-form-item label="数据处理">
          <codemirror ref="codeEditor" v-model="form.handler" />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <div>{{form.name}}</div>
  </el-form>
</template>

<script>
export default {
  name: 'static',
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
        handler: `function handler(deps) {\nreturn deps.data\n}`,
        ...this.dataSource
      },
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    getForm () {
      return {
        ...this.form,
        // url: this.form.url.trim(), // 移除\n\r 空格等
        // handler: this.$refs.codeEditor.codemirror.getValue()
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
