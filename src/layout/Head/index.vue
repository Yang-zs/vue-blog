<template>
  <div class="head">
    <div class="left">221</div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import UsersApi from '../../api/login'
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    async handleCommand(command) {
      if (command === 'a') {
        await UsersApi.logout()
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 40px;
}
.right {
  display: flex;
}
</style>
