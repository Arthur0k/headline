<template>
  <div id="MyComment">
    <ak-header>我的跟帖</ak-header>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: []
    }
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('/user_comments')
      console.log(res)
      this.commentList = res.data.data
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
