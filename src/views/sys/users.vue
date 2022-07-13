<template>
  <div class="users">
    <breadcrumb></breadcrumb>
    <el-card>
      <!-- 搜索 -->
      <div class="search-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input
              clearable
              v-model="formInlineUsername"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="success" @click="onSearch"
              >查询</el-button
            >
          </el-form-item>
        </el-form>

        <el-button
          icon="el-icon-plus"
          class="addbtn"
          type="primary"
          @click="dialogFormVisible = true"
          >新增</el-button
        >
      </div>

      <!-- 表格 -->
      <el-table :border="true" :data="tableData" stripe style="width: 100%;">
        <el-table-column align="center" type="index" label="序号">
        </el-table-column>
        <el-table-column align="center" prop="username" label="用户名">
        </el-table-column>
        <el-table-column align="center" prop="avatar" label="头像">
          <template v-slot="{ row: { avatar } }">
            <el-avatar :size="60" :src="avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="roles" label="角色">
          <template v-slot="{ row: { roles } }">
            <el-tag v-for="item in roles" :key="item.id">{{
              item.name
            }}</el-tag>
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
    <!-- 弹框 -->
    <el-dialog title="新增用户" v-model:visible="dialogFormVisible">
      <el-form :model="dialogForm">
        <!-- 头像 -->
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-avatar :size="60" :src="dialogForm.avatar"></el-avatar>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UsersApi from '../../api/users'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      formInline: {},
      formInlineUsername: '',
      tableData: [],
      tableParameter: {
        current: '',
        size: 20,
        username: ''
      },
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      // dialog表单
      dialogForm: {
        name: '',
        avatar: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { records } = await UsersApi.getUserList(this.tableParameter)
      this.tableData = records

      // console.log(this.tableData, '32132')
    },
    handleEdit(index, row) {
      // console.log(index, row)
    },
    handleDelete(index, row) {
      // console.log(index, row)
    },
    onSubmit() {
      // console.log('submit!')
    },
    // 搜索
    async onSearch() {
      const obj = {
        current: 1,
        size: 20,
        username: this.formInlineUsername
      }
      const { records } = await UsersApi.getUserList(obj)
      // console.log(records, '搜索结果')
      this.tableData = records
    }
  },
  watch: {
    formInlineUsername: {
      handler(value) {
        // console.log(value, '搜索框内容')
        if (value === '') {
          this.getUserList()
        }
      }
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}
.search-form {
  display: flex;
  height: 80px;
  width: 100%;
  margin-bottom: 15px;
  justify-content: space-between;
}
.addbtn {
  width: 90px;
  height: 40px;
}
</style>
