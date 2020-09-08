<template>
  <div id="Index">
    <div class="topbar">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push('search')">
        <div class="bg">
          <span class="iconfont iconsearch"></span>
          <span class="search-txt">搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
      <van-sticky class="more-container">
        <div class="more" @click="$router.push('/manage')">
          <span class="iconfont iconjiantou1"></span>
        </div>
      </van-sticky>
    <div class="tab">
      <van-tabs sticky v-model="active" animated swipeable>
        <van-tab v-for="(item, index) in tabList" :key="index" :title="item.name">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ak-post :post="item" v-for="item in posts" :key="item.id"></ak-post>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import AkPost from 'components/AkPost'

export default {
  name: 'index',
  components: {
    AkPost
  },
  data() {
    return {
      active: 1,
      tabList: [],
      posts: [],
      loading: false,
      finished: false,
      pageIndex: 0,
      pageSize: 6,
      refreshing: false
    }
  },
  methods: {
    onRefresh() {
      this.posts = []
      this.pageIndex = 0
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    getPost(id) {
      setTimeout(async () => {
        this.pageIndex += 1
        const res = await this.$axios.get('/post', {
          params: {
            category: id,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        })
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.posts.push(...data)
          this.loading = false
          this.refreshing = false

          if (data.length < this.pageSize) {
            this.finished = true
          }
        }
      }, 500)
    },
    onLoad() {
      this.getPost(this.tabList[this.active].id)
    },
    async getCategory() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
      }
    }
  },
  created() {
    this.getCategory()
    this.getPost()
  },
  watch: {
    active(value) {
      this.posts = []
      this.pageIndex = 0
      this.loading = false
      this.finished = true
      this.getPost(this.tabList[value].id)
    }
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
  .more {
    position: absolute;
    right: 0;
    width: 15%;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    text-align: center;
    z-index: 100;
  }
  .tab {
    /deep/ .van-tabs__wrap {
      width: 85%;
    }
  }
}
</style>
