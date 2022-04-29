<template>
<div class="login">
  <div class="login__bg">
    <div class="login__bg__main">
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
  <div class="login__main">
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
</div>
</template>

<script>
import { login, register } from '@/utils/api'
import { Notification } from 'element-ui'

export default {
  name: 'login',
  data() {
    return {
      width: 1,
      formData: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {
    setInterval(() => {
      if (this.width < 10) {
        this.width++
      }
    }, 1000)
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
        localStorage.setItem('user', JSON.stringify(data.data))
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
@keyframes rotate {
  0%{
    filter: hue-rotate(0deg);
  }
  100%{
    filter: hue-rotate(360deg);
  }
}
.login {
  display: flex;
  &__bg {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2a3137;
    min-height: 100vh;
    &__main {
      position: relative;
      height: 0px;
      width: 0px;
      left: -100px;
      top: -100px;
      background: linear-gradient(#14ffe0,#ffeb3b,#ff00e0);
      border-radius: 50%;
      animation: rotate 1.5s linear infinite;
      span {
        position: absolute;
        height: 200px;
        width: 200px;
        background: linear-gradient(#14ffe0,#ffeb3b,#ff00e0);
        border-radius: 50%;
      }
      span:nth-child(1) {
        filter: blur(100px);
      }
      span:nth-child(2) {
        filter: blur(120px);
      }
      span:nth-child(3) {
        filter: blur(140px);
      }
      span:nth-child(4) {
        filter: blur(160px);
      }
    }
  }
  &__main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__form {
    min-width: 400px;
    padding: 32px 20px 10px 20px;
    border-radius: 10px;
    background: white;
  }
}
</style>
