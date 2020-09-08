<template>
  <div id="User">
    <kt-header>个人中心</kt-header>
    <div class="userinfo" @click="go">
      <img class="img" :src="$axios.defaults.baseURL + user.head_img" alt />
      <div class="info">
        <div>
          <span class="iconfont iconxingbienan"></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="datetime">{{user.create_date | time}}</div>
      </div>
      <div class="icon">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <nav-item v-for="item in navData" :key="item.index"  :path="item.path?item.path:''">
      <template>{{item.title}}</template>
      <template #content>{{item.content}}</template>
    </nav-item>
    <div class="btn" @click="exit">
      <van-button type="primary" block>退出</van-button>
    </div>
  </div>
</template>

<script>
import NavItem from 'components/NavItem'

export default {
  components: {
    NavItem
  },
  data() {
    return {
      user: {},
      navData: [
        { index: 1, content: '关注的用户', title: '我的关注' },
        { index: 2, content: '跟帖/回帖', title: '我的跟帖' },
        { index: 3, content: '文章/视频', title: '我的收藏' },
        { index: 4, path: '/user-edit', content: '', title: '设置' }
      ]
    }
  },
  methods: {
    go() {
      this.$router.push('/user-edit')
    },
    async exit() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确认要退出吗'
        })
      } catch (err) {
        return
      }
      localStorage.removeItem('userid')
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    async getUserInfo() {
      const userid = localStorage.getItem('userid')
      const res = await this.$axios.get(`/user/${userid}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
#User {
  .userinfo {
    display: flex;
    padding: 30px 20px;
    align-items: center;
    border-bottom: 3px solid #666;
    .img {
      width: 70px;
      height: 70px;
      margin-right: 15px;
      vertical-align: middle;
    }
    .info {
      flex: 1;
      .iconfont {
        margin-right: 10px;
      }
      .datetime {
        margin-top: 10px;
      }
    }
    .icon {
      text-align: right;
    }
  }
  .btn {
    margin: 30px 15px 0;
  }
}
</style>
