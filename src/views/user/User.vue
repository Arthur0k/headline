<template>
  <div id="User">
    <div class="user-container" @click="$router.push('user-edit')">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + user.head_img" alt />
      </div>
      <div class="userInfo">
        <div class="gender">
          <span class="iconfont" :class="user.gender === 1 ? 'iconxingbienan' : 'iconxingbienv'"></span>
          <span class="nickname">{{user.nickname}}</span>
        </div>
        <div class="datetime">{{user.create_date | time }}</div>
      </div>
      <div class="jiantou">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <ak-nav-item path="/myfollow">
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </ak-nav-item>
    <ak-nav-item path="/mycomment">
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </ak-nav-item>
    <ak-nav-item>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </ak-nav-item>
    <ak-nav-item path="/user-edit">
      <template>设置</template>
    </ak-nav-item>
    <van-button type="info" block class="btn" @click.native="quit">退出登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  methods: {
    async quit() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '真的要退出吗'
        })
      } catch (err) {
        return
      }
      this.$router.push('/login')
      localStorage.removeItem('id')
      localStorage.removeItem('token')
    },
    async getUserData() {
      const id = localStorage.getItem('id')
      const token = localStorage.getItem('token')
      const res = await this.$axios.get(`/user/${id}`, {
        headers: { authorization: token }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    }
  },
  created() {
    this.getUserData()
  }
}
</script>

<style lang="less" scoped>
#User {
  padding: 15px;
  .user-container {
    display: flex;
    align-items: center;
    padding: 30px 10px 30px 15px;
    border-bottom: 3px solid #eee;
    .avatar {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .userInfo {
      font-size: 14px;
      flex: 1;
      margin-left: 10px;
      .datetime {
        margin-top: 5px;
      }
      .iconxingbienan {
        color: skyblue;
      }
      .iconxingbienv {
        color: pink;
      }
    }
  }
  .btn {
    margin-top: 20px;
  }
}
</style>
