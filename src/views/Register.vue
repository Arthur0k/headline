<template>
  <div id="Register">
    <kt-header>注册</kt-header>
    <kt-logo></kt-logo>
    <van-form class="form" @submit="onSubmit">
      <van-field v-model="user.username" name="username" placeholder="用户名" :rules="rules.username" />
      <van-field
        v-model="user.nickname"
        name="nickname"
        placeholder="昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="danger" native-type="submit">提交</van-button>
      </div>
      <div class="tip">
        已有账号?点击
        <router-link to="/login">登录</router-link>
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
        password: '',
        nickname: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名' },
          { pattern: /\w{3,}/, message: '请输入正确的用户名' }
        ],
        nickname: [
          { required: true, message: '请填写昵称' },
          { pattern: /\w{1,}/ }
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
      const res = await this.$axios.post('/register', value)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: { user: value }
        })
      } else {
        this.$toast.fail('注册失败')
      }
      console.log(res)
    }
    /**
     * 网络请求
     */
  }
}
</script>

<style lang="less" scoped>
#Register {
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
