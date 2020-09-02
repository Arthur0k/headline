<template>
  <div id="MyFollow">
    <ak-header>我的关注</ak-header>
    <div class="my-follow" v-for="item in followList" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.head_img" alt />
      </div>
      <div class="content">
        <div class="title">{{item.nickname}}</div>
        <div class="datetime">{{item.create_date | time}}</div>
      </div>
      <div class="right">
        <van-button round size="small" type="primary" @click="cancel(item.id)">取消关注</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      followList: []
    }
  },
  methods: {
    async getFollowList() {
      const res = await this.$axios.get('/user_follows')
      this.followList = res.data.data
    },
    async cancel(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '是否取消关注'
        })
      } catch {
        return this.$toast('取消失败')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.getFollowList()
      }
    }
  },
  created() {
    this.getFollowList()
  }
}
</script>

<style lang="less" scoped>
#MyFollow {
  .my-follow {
    display: flex;
    height: 100px;
    padding: 0 20px;
    align-items: center;
    border-bottom: 1px solid #666;
    img {
      width: 50px;
      height: 50px;
      margin-right: 15px;
      vertical-align: middle;
    }
    .content {
      font-size: 16px;
      flex: 1;
      .datetime {
        margin-top: 5px;
      }
    }
  }
}
</style>
