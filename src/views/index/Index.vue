<template>
  <div id="Index">
    <div class="topbar">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="bg">
          <span class="iconfont iconsearch"></span>
          <span class="search-txt">搜索新闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <div class="tab">
      <van-tabs sticky v-model="active" animated swipeable>
        <van-tab v-for="(item, index) in tabList" :key="index" :title="item">内容 {{ index }}</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      tabList: []
    }
  },
  methods: {
    async getCategory() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data.map(item => item.name)
        console.log(this.tabList)
      }
    }
  },
  created() {
    this.getCategory()
  }
}
</script>

<style lang="less" scoped>
#Index {
  .topbar {
    display: flex;
    height: 50px;
    line-height: 50px;
    background-color: #f00;
    .logo,
    .user {
      width: 70px;
      text-align: center;
    }
    .logo {
      span {
        font-size: 60px;
        color: white;
      }
    }
    .search {
      flex: 1;
      text-align: center;
      .bg {
        height: 36px;
        margin-top: 7px;
        line-height: 36px;
        font-size: 16px;
        color: #fff;
        background-color: #ee938b;
        border-radius: 17px;
        .iconfont {
          font-size: 18px;
          margin-right: 5px;
        }
      }
    }
    .user {
      span {
        font-size: 27px;
        color: white;
      }
    }
  }
}
</style>
