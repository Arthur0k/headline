<template>
  <div id="Login">
    <ak-header>登录</ak-header>
    <ak-logo></ak-logo>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.password"
        name="password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;" class="myBtn">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <p>
      没有账号?点击
      <router-link to="/register">注册</router-link>
    </p>
  </div>
</template>

<script>
import AkLogo from 'components/AkLogo'

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空' },
          { pattern: /\d{3,}/, message: '请输入正确的用户名' }
        ],
        password: [
          { required: true, message: '密码不能为空' },
          { pattern: /\d{3,9}/, message: '请输入3-12位密码' }
        ]
      }
    }
  },
  components: {
    AkLogo
  },
  methods: {
    async onSubmit(value) {
      const res = await this.$axios.post('/login', this.user)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)

        // 存取token id
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.user.id)
        this.$router.push('/user')
      } else {
        this.$toast.fail('登录失败')
      }
    }
  },
  created() {
    const { username, password } = this.$route.params
    this.user.username = username
    this.user.password = password
  }
}
</script>

<style lang="less" scoped>
#Login {
  .myBtn {
    padding-top: 40px;
  }
  p {
    padding: 15px;
    text-align: right;
    font-size: 14px;
    a {
      color: red;
    }
  }
}
</style>
