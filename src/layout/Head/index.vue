<template>
  <div class="head">
    <div class="left">
      <i class="el-icon-s-fold"></i>
      <tags-view></tags-view>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import TagsView from '@/components/TagsView.vue'
import UsersApi from '../../api/login'
export default {
  components: { TagsView },
  data() {
    return {}
  },
  created() {},
  methods: {
    async handleCommand(command) {
      if (command === 'a') {
        await UsersApi.logout()
        this.$router.push('/login')
        this.$message({
          message: '退出成功',
          type: 'success'
        })
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
  padding: 0 40px 0 0;
}
.right {
  display: flex;
}
.left {
  display: flex;
  height: 100%;
  align-items: center;
}
.el-icon-s-fold {
  cursor: pointer;
}
</style>
