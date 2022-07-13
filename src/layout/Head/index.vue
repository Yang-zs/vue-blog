<template>
  <div class="head">
    <div class="left">
      <i class="el-icon-s-fold" @click="Telescoping"></i>
      <tags-view></tags-view>
    </div>
    <div class="right">
      <div>
        <el-tooltip
          class="item"
          effect="dark"
          content="全屏"
          placement="bottom"
        >
          <i class="el-icon-rank"></i>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="关闭全部标签"
          placement="bottom"
        >
          <i class="el-icon-circle-close"></i>
        </el-tooltip>
      </div>
      <span>
        <el-avatar :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
      </span>
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
    },
    // 控制侧边栏伸缩
    Telescoping() {
      this.$store.dispatch('telescoping/setCollapse')
      console.log(this.$store.getters.collapse, 's2s2')
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
  padding: 0 10px 0 0;
}
.right {
  width: 300px;
  display: flex;
  align-items: center;
}
.left {
  display: flex;
  height: 100%;
  align-items: center;
}
.el-icon-s-fold {
  cursor: pointer;
}
.el-tooltip {
  margin-right: 15px;
}
.el-icon-circle-close,
.el-icon-rank {
  font-size: 25px;
  color: white;
  margin: 0 15px;
}
.el-icon-rank {
  margin-right: 10px;
  transform: rotate(15deg);
}
.el-dropdown-link {
  margin-left: 15px;
}
</style>
