<template>
  <el-dropdown>
    <span class="name" role="lang">{{ user.username }}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="layout('zh-CN')">
        {{$t('header.logout')}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'userDropdown',
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user')||'{}')
  },
  methods:{
    layout() {
      localStorage.setItem('token', '')
      localStorage.setItem('user', '{}')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.name {
  color: white;
  cursor: pointer;
}
</style>
