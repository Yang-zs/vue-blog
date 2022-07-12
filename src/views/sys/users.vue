<template>
  <div class="users">
    <breadcrumb></breadcrumb>
    <el-card>
      <!-- 表格 -->
      <el-table border="true" :data="tableData" stripe style="width: 100%;">
        <el-table-column align="center" type="index" label="序号">
        </el-table-column>
        <el-table-column align="center" prop="username" label="用户名">
        </el-table-column>
        <el-table-column align="center" prop="avatar" label="头像">
          <el-avatar :src="avatar"></el-avatar>
        </el-table-column>
        <el-table-column align="center" prop="roles" label="角色">
          <template #default="scope">
            <el-tag>{{ scope.row.roles[0].name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="email" label="邮箱">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="注册时间">
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="100"
              inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="260px">
          <template #default="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              type="success"
              plain
              >编辑</el-button
            >
            <el-button type="warning" size="mini" plain>分配权限</el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import UsersApi from '../../api/users'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      tableData: [],
      tableParameter: {
        current: '',
        size: 20,
        username: ''
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { records } = await UsersApi.getUserList(this.tableParameter)
      this.tableData = records
      console.log(this.tableData, '32132')
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}
</style>
