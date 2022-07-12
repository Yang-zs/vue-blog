<template>
  <el-main class="app-main">
    <router-view></router-view>
  </el-main>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  watch: {
    $route: {
      handler(to, from) {
        if (to.meta && to.meta.title && to.path) {
          const obj = {
            title: to.meta.title,
            path: to.path
          }
          this.$store.commit('tagsview/setTagsView', obj)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped></style>
