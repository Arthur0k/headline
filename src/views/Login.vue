<template>
  <div id="Login">
    <kt-header>登录</kt-header>
    <kt-logo></kt-logo>
    <van-form class="form" @submit="onSubmit">
      <van-field v-model="user.username" name="username" placeholder="用户名" :rules="rules.username" />
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
      <div class="tip">
        没有账号?点击
        <router-link to="/register">注册</router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
import KtLogo from 'components/KtLogo'

export default {
  components: {
    KtLogo
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名' },
          { pattern: /\w{3,}/, message: '请输入正确的用户名' }
        ],
        password: [
          { required: true, message: '请填写密码' },
          { pattern: /\d{3,}/, message: '请输入正确的密码' }
        ]
      }
    }
  },
  methods: {
    async onSubmit(value) {
      const res = await this.$axios.post('/login', value)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        localStorage.setItem('userid', data.user.id)
        localStorage.setItem('token', data.token)
        this.$toast.success(message)
        this.$router.push('/user')
      } else {
        this.$toast.fail('登录失败')
      }
      console.log(res)
    }
    /**
     * 网络请求
     */
  },
  created() {
    if (this.$route.params.user) {
      const { username, password } = this.$route.params.user
      this.user.username = username
      this.user.password = password
    }
    console.log(this.$route.params.user)
  }
}
</script>

<style lang="less" scoped>
#Login {
  .form {
    padding: 0 10px;
  }
  .tip {
    margin-top: 20px;
    margin-right: 10px;
    font-size: 14px;
    text-align: right;
    a {
      color: orange;
    }
  }
}
</style>
