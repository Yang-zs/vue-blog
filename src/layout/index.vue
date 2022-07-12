<template>
  <el-container>
    <sdie-menu></sdie-menu>
    <el-container>
      <el-header>Header</el-header>
      <app-main></app-main>
    </el-container>
  </el-container>
</template>

<script>
import SdieMenu from '@/components/SdieMenu.vue'
import AppMain from './AppMain.vue'

export default {
  components: { SdieMenu, AppMain },
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
  margin: 0;
  /* padding: 0; */
}

.el-container {
  height: 100%;
}
</style>
