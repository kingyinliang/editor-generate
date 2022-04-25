<template>
<div class="login">
  <el-form
    class="login__form"
    label-position="left"
    label-width="105px"
    :model="formData"
  >
    <el-form-item label="账号：">
      <el-input
        v-model="formData.username"
        :maxlength="20"
        placeholder="请输入账号"
      />
    </el-form-item>
    <el-form-item label="密码：">
      <el-input
        type="password"
        v-model="formData.password"
        :maxlength="20"
        placeholder="请输入6-20位数字或字母组合"
      />
    </el-form-item>
    <el-form-item style="text-align: right;">
      <el-button @click="clear">
        重  置
      </el-button>
      <el-button type="primary" @click="goRegister">
        注  册
      </el-button>
      <el-button type="primary" @click="goLogin">
        登  录
      </el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { login, register } from '@/utils/api'
import { Notification } from 'element-ui'

export default {
  name: 'login',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    clear() {
      this.formData = {
        username: '',
        password: ''
      }
    },
    goLogin() {
      login(this.formData).then(({data}) => {
        Notification({ title: '成功', message: '登录成功', type: 'success', duration: 2000 });
        localStorage.setItem('token', data.data.token)
        this.$router.push({ path: '/work/list' });
      })
    },
    goRegister() {
      register(this.formData).then(() => {
        Notification({ title: '成功', message: '注册成功', type: 'success', duration: 2000 });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #00B7FF;
  display: flex;
  align-items: center;
  justify-content: center;
  &__form {
    width: 60%;
    padding: 32px 20px 10px 20px;
    border-radius: 10px;
    background: white;
  }
}
</style>
