<template>
  <div class="users">
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
          @click="addDialog"
          >新增</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id"> </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="描述" prop="desc"> </el-table-column>
      </el-table>
      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :border="true"
        :data="tableData"
        stripe
        style="width: 100%;"
      >
        <el-table-column align="center" width="100px" type="index" label="序号">
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
          <template v-slot="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              type="success"
              plain
              >编辑</el-button
            >
            <el-button
              type="warning"
              @click="handleOpenRoleDialog(scope.row)"
              size="mini"
              plain
              :disabled="
                scope.row.roles.length === 1 &&
                scope.row.roles[0].code === 'admin'
              "
              >分配权限</el-button
            >
            <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)"
              :disabled="
                scope.row.roles.length === 1 &&
                scope.row.roles[0].code === 'admin'
              "
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹框 -->
    <div class="dialog-box">
      <el-dialog title="新增用户" v-model:visible="dialogFormVisible">
        <el-form :model="dialogForm">
          <!-- 头像 -->
          <el-form-item label="头像" :label-width="formLabelWidth">
            <el-avatar :size="60" :src="dialogForm.avatar"></el-avatar>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input
              v-model="dialogForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input
              type="password"
              v-model="dialogForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio-group v-model="dialogForm.status">
              <el-radio value="1" :label="1">启用</el-radio>
              <el-radio value="2" :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOrEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 分页 -->
    <div class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableParameter.current"
        :page-sizes="[5, 7, 9, 10]"
        :page-size="tableParameter.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 分配权限 -->
    <el-dialog
      width="30%"
      center
      title="分配角色"
      v-model:visible="roleDialogFormVisible"
    >
      <el-form
        :model="roleForm"
        :rules="roleRules"
        ref="roleDialogForm"
        label-width="60px"
      >
        <el-form-item label="角色" prop="roleId">
          <el-select
            style="width: 100%;"
            multiple
            v-model="roleForm.roleId"
            placeholder="请选择角色"
          >
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UsersApi from '../../api/users'
import MenuApi from '@/api/menus'
import RoleManagerApi from '@/api/role-manager'
export default {
  data() {
    return {
      orr: true,
      loading: false,
      formInline: {},
      formInlineUsername: '',
      tableData: [],
      total: 10,

      tableParameter: {
        current: 1,
        size: 10,
        username: '',
        password: '',
        createTime: ''
      },
      roleList: [],
      roleId: '',
      roleForm: {
        roleId: []
      },
      roleRules: {
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      // dialog表单
      dialogForm: {
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8e360403-b17a-4c03-87b3-832ad7eb5fde/944e2483-68a2-47b6-b4fd-9e65f5a8c76d.jpg',
        username: '',
        email: '',
        password: '',
        status: 1
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
      // 分配权限表单
      dialogTableVisible: false,
      dialogFormVisible: false,
      roleDialogFormVisible: false,
      formLabelWidth: '60px'
    }
  },
  created() {
    this.getMenuList()
    this.handleGetRoleList()
  },
  methods: {
    handleOpenRoleDialog(row) {
      this.roleForm.roleId = []
      this.roleDialogFormVisible = true
      row.roles.forEach((item) => {
        this.roleForm.roleId.push(item.id)
      })
      this.roleId = row.id
      console.log(this.roleForm.roleId)
    },
    handleSubmitRole() {
      console.log(11)
      this.$refs.roleDialogForm.validate(async (valid) => {
        console.log(2)
        if (valid) {
          const response = await RoleManagerApi.updateRole(
            this.roleId,
            this.roleForm.roleId
          )
          this.roleDialogFormVisible = false
          this.$notify({ title: '提示', message: '更新成功', type: 'success' })
          this.getUserList()
          console.log(response)
        }
      })
    },
    async handleGetRoleList() {
      try {
        const data = { current: this.current, size: this.size }
        const { records } = await UsersApi.getRoleList(data)
        this.roleList = records
        console.log(this.roleList, 'role')
      } catch (e) {
        console.log(e)
      }
    },
    // 分配权限
    addDialog() {
      this.orr = true
      this.dialogFormVisible = true
    },
    addOrEdit() {
      if (this.orr === true) {
        this.addUserInfo()
      } else {
        this.addEdit()
      }
    },
    async addEdit() {
      const res = UsersApi.updataUserInfo(this.dialogForm)
      console.log(res, '修改状态')
      if (res) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getUserList()
      }
    },
    // 分页
    handleSizeChange(val) {
      this.tableParameter.size = val
      this.getUserList()
      console.log(1212)
    },
    handleCurrentChange(val) {
      this.tableParameter.current = val
      this.getUserList()
      console.log(1313)
    },
    // 添加用户数据
    async addUserInfo() {
      const response = await UsersApi.addUserInfo(this.dialogForm)
      // console.log(response, '添加结果.vue')
      this.getUserList()
      this.dialogFormVisible = false
    },
    // 获取列表数据
    async getMenuList() {
      const res = MenuApi.getMenuList()
      console.log(res, 'getMenuList')
    },
    // 编辑
    async handleEdit(index, row) {
      this.orr = false
      console.log(index, row)
      this.dialogFormVisible = true
      const res = await UsersApi.getAloneUserInfo(row.id)
      console.log(res, '获取单个用户信息')
      this.dialogForm = res
    },

    async handleDelete(index, row) {
      console.log(index, row)
      const res = await UsersApi.removeUser(row.id)
      console.log(res, '删除结果')
      this.getUserList()
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
.el-dialog {
  width: 455px;
  height: 466px;
}
.el-input {
  width: 100%;
  height: 100%;
}
.el-form-item {
  width: 335px;
  height: 40px;
}
.el-form {
  width: 350px;
  margin: 0;
  padding: 0;
}
.el-dialog__bodyg {
  width: 360px;
  padding: 0;
}
.el-dialog__header {
  width: 360px;
  padding: 0;
}
.el-dialog {
  width: 360px;
  padding: 0;
}
.dialog-box {
  width: 100px;
}
.pages {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
