<template>
  <div id="Register">
    <ak-header>注册</ak-header>
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
        v-model="user.nickname"
        name="nickname"
        label="昵称"
        placeholder="昵称"
        :rules="rules.nickname"
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
      <router-link to="/login">登录</router-link>
    </p>
  </div>
</template>

<script>
import AkLogo from 'components/AkLogo'

export default {
  components: {
    AkLogo
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
          { required: true, message: '用户名不能为空' },
          { pattern: /\w{6}/, message: '请输入正确的用户名' }
        ],
        password: [
          { required: true, message: '密码不能为空' },
          { pattern: /\d{3,9}/, message: '请输入3-12位密码' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空' },
          // { pattern: /[\u4e00-\u9fa5]{2,6}/, message: '请输入2-6个中文字符' }
          { pattern: /\d{2,6}/, message: '请输入2-6个中文字符' }
        ]
      }
    }
  },
  methods: {
    async onSubmit(value) {
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: value
        })
      } else {
        this.$toast.fail('注册失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
#Register {
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
