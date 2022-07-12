<template>
  <el-aside width="200px">
    <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#1e2d32"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- 无children -->
      <template>
        <div v-for="(item, index) in navList" :key="index">
          <el-menu-item
            v-if="item.children && item.children.length <= 0"
            :index="item.path"
          >
            <i class="el-icon-setting"></i>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </div>
      </template>

      <!-- 有children -->
      <div v-for="(item, index) in navList" :key="index">
        <el-submenu
          v-if="item.children && item.children.length > 0"
          :index="item.path"
        >
          <template #title>
            <i class="el-icon-location"></i>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group v-for="(ite, ind) in item.children" :key="ind">
            <el-menu-item :index="ite.path">{{ ite.label }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
// import SdieMenu from '@/components/SdieMenu.vue'
import { getItem } from '../utils/storage'
export default {
  // components: { SdieMenu },
  // name: 'SdieMenu',
  data() {
    return {
      navList: []
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    getMenus() {
      const menus = getItem('menus')
      this.navList = menus
      console.log(menus, '22')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
}
</style>
