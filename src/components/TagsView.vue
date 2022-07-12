<template>
  <div>
    <el-tag
      v-for="(item, index) in tagsList"
      :key="index"
      :type="$route.path === item.path ? 'danger' : 'warning'"
      closable
      @click="goPath(item.path)"
      @close="handleClose(tag)"
    >
      {{ item.title }}</el-tag
    >
    <!-- <el-tag type="danger" closable>标签五</el-tag> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagsList: [],
      newPath: '',
      type: 'warning'
    }
  },
  created() {
    this.getTagsList()
  },
  methods: {
    // 获取tagsview
    getTagsList() {
      this.tagsList = this.$store.getters.tagsview
    },
    // 路由跳转
    goPath(path) {
      if (path === this.$route.path) return
      this.$router.push(path)
    },
    // 小查号关闭
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$store.commit('tagsview/removeTagItem', tag)
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin-left: 10px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #f5a443;
}
</style>
