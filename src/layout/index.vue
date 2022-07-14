<template>
  <el-container>
    <sdie-menu></sdie-menu>
    <el-container>
      <el-header>
        <Head></Head>
      </el-header>
      <div>
        <breadcrumb></breadcrumb>
      </div>
      <app-main> </app-main>
    </el-container>
  </el-container>
</template>

<script>
import SdieMenu from '@/components/SdieMenu.vue'
import AppMain from './AppMain.vue'
import Head from './Head/index.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  components: { SdieMenu, AppMain, Head, Breadcrumb },
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
