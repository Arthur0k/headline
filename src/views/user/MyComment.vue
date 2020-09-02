<template>
  <div id="MyComment">
    <ak-header>我的跟帖</ak-header>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="mycomment" v-for="item in commentList" :key="item.id">
          <div class="time">{{item.create_date|time}}</div>
          <div class="comment" v-if="item.parent">
            <div class="name">{{item.parent.user.nickname}}</div>
            <div class="title">{{item.parent.content}}</div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="parent">
            <p class="content">{{item.post.title}}</p>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 6,
      refreshing: false
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.getCommentList()
      }, 500)
    },
    onRefresh() {
      this.pageIndex = 1
      this.loading = true
      this.commentList = []
      this.getCommentList()
    },
    async getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        params: { pageIndex: this.pageIndex, pageSize: this.pageSize }
      })
      this.pageIndex += 1
      this.commentList.push(...res.data.data)
      console.log(this.commentList)

      this.loading = false

      if (res.data.data.length < 6) {
        this.finished = true
      }
      this.refreshing = false
    }
  },
  created() {
    this.getCommentList()
  }
}
</script>

<style lang="less" scoped>
#MyComment {
  .mycomment {
    padding: 20px 10px;
    border-bottom: 1px solid #999;
    .time {
      font-size: 16px;
    }
    .comment {
      margin-top: 10px;
      padding: 15px 10px;
      background-color: #e4e4e4;
      font-size: 16px;
    }
    .content {
      margin-top: 10px;
      font-size: 16px;
    }
    .parent {
      display: flex;
      .content {
        width: 80%;
        margin-top: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .iconfont {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>
