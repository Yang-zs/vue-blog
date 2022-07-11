<template>
  <el-container>
    <sdie-menu></sdie-menu>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SdieMenu from '@/components/SdieMenu.vue'

export default {
  components: { SdieMenu },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('user/getNav')
  }
}
</script>

<style scoped>
.el-header {
  background-color: #00bb9c;
  color: #333;
}

.el-aside {
  background-color: #1e2d32;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-container {
  height: 100%;
}
</style>
