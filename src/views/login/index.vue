<template>
  <div id="login">
    <h1>智慧服务平台</h1>
    <div class="login-form">
      <h2>欢迎登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="ImgCode">
          <div class="imgCode-form">
            <el-input
              placeholder="请输入验证码"
              class="imgCode-item"
              v-model="ruleForm.ImgCode"
            ></el-input>
            <img class="ImgCode" @click="getCaptcha" :src="ImgCode" alt="" />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ImgCode: '',
      ruleForm: {
        username: 'duck',
        password: 'admin888',
        code: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        ImgCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const response = await this.$store.dispatch(
            'user/loginOperation',
            this.ruleForm
          )
          console.log(response, '登录')
          if (!response) return
          this.$notify({
            title: '成功',
            message: '登录成功',
            type: 'success'
          })
          this.$router.push('/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取验证码信息
    async getCaptcha() {
      const { captchaImg, token } = await this.$store.dispatch(
        'user/getCaptcha'
      )
      this.ImgCode = captchaImg
      this.ruleForm.token = token
    },
    // 获取navList
    async getNavList() {}
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url('../../assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
}
.login-form {
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 300px;
  width: 300px;
}
h1 {
  color: #fff;
  font-size: 40px;
  position: absolute;
  top: 50px;
  left: 50%;
  margin-left: -120px;
}
h2 {
  color: #fff;
  font-size: 30px;
  margin-bottom: 30px;
}
.el-button {
  width: 100%;
}
.imgCode-item {
  width: 180px;
}
.imgCode-form {
  display: flex;
  align-items: center;
}
.ImgCode {
  width: 117px;
  height: 40px;
  margin-left: 10px;
}
</style>
