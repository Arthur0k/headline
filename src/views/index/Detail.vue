<template>
  <div id="Detail">
    <div class="detail-header">
      <div class="back" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="followed" v-if="article.has_follow">
        <van-button @click="unfollow" class="btn" type="danger" round size="small">已关注</van-button>
      </div>
      <div class="follow" v-else>
        <van-button @click="follow" class="btn" type="primary" round size="small">关注</van-button>
      </div>
    </div>
    <div class="content">
      <video :src="article.content" autoplay controls muted v-if="article.type === 2"></video>
      <div v-else>
        <h3>{{article.title}}</h3>
        <div class="info">
          <span class="nickname">{{article.user.nickname}}</span>
          <span class="date">{{article.create_date | time}}</span>
        </div>
        <div class="article" v-html="article.content"></div>
      </div>
      <div class="func">
        <div class="star" @click="star" :class="{active: isActive}">
          <span class="iconfont icondianzan"></span>
          <span>{{article.like_length}}</span>
        </div>
        <div class="wechat">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="comment-title">
      <h4>精彩跟帖</h4>
      <comment :comment="comment" v-for="comment in comments" :key="comment.id"></comment>
    </div>
    <div class="footer-active" v-if="isShowTextarea">
      <textarea ref="txt" v-model="content" :placeholder="'回复: '+ nickname"></textarea>
      <van-button type="danger" class="btn" @click="send">发送</van-button>
    </div>
    <div class="footer" v-else>
      <div class="reply">
        <input type="text" @focus="onFocus" placeholder="回复" />
      </div>
      <div class="comment">
        <span class="iconfont iconpinglun-"></span>
        <span id="count">102</span>
      </div>
      <div class="like">
        <span class="iconfont iconshoucang"></span>
      </div>
      <div class="share">
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
    <div class="placeholder" style="height: 50px"></div>
  </div>
</template>

<script>
import Comment from 'components/Comment'

export default {
  components: {
    Comment
  },
  data() {
    return {
      article: {
        user: {}
      },
      isActive: false,
      articleId: 0,
      comments: [],
      isShowTextarea: false,
      content: '',
      parent_id: null,
      nickname: ''
    }
  },
  methods: {
    // 发布评论
    async send() {
      const res = await this.$axios.post(`/post_comment/${this.articleId}`, {
        content: this.content,
        parent_id: this.parent_id
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.isShowTextarea = false
        this.content = ''
        this.nickname = ''
        this.parent_id = null
        this.getComments()
      }
    },
    async onFocus() {
      this.isShowTextarea = true
      await this.$nextTick()
      this.$refs.txt.focus()
    },
    async getComments() {
      const res = await this.$axios.get(`/post_comment/${this.articleId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.comments = data
        console.log('comment', data)
      }
    },
    async star() {
      const res = await this.$axios.get(`/post_like/${this.articleId}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.isActive = !this.isActive
        this.$toast.success(message)
        this.getPostDetail()
      } else {
        this.$toast.success(message)
      }
    },
    isNoLogin() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      } else {
        return false
      }
    },
    async follow() {
      if (this.isNoLogin()) return
      const res = await this.$axios.get(`/user_follows/${this.article.user.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async unfollow() {
      const res = await this.$axios.get(
        `/user_unfollow/${this.article.user.id}`
      )
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async getPostDetail() {
      this.articleId = this.$route.params.id
      const res = await this.$axios.get(`/post/${this.articleId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.article = data
      }
    }
  },
  created() {
    this.getPostDetail()
    this.getComments()
    this.$bus.$on('reply', async (id, nickname) => {
      this.nickname = '@' + nickname
      this.parent_id = id
      this.onFocus()
    })
    this.$bus.$once('hook:beforeDestroy', () => {
      this.$off('reply')
    })
  }
}
</script>

<style lang="less" scoped>
#Detail {
  .detail-header {
    display: flex;
    align-items: center;
    .back {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .title {
      flex: 1;
      span {
        font-size: 50px;
      }
    }
    .followed,
    .follow {
      // width: 100px;
      margin-right: 15px;
      .btn {
        width: 60px;
      }
    }
  }
  .content {
    /deep/ video {
      width: 100%;
    }
    padding: 0 12px;
    h3 {
      font-size: 18px;
    }
    .info {
      margin-top: 5px;
      font-size: 14px;
      color: #666;
      .date {
        margin-left: 14px;
      }
    }
    .article {
      margin-top: 14px;
      font-size: 14px;
      line-height: 30px;
      /deep/ img {
        width: 100%;
        height: 400px;
      }
    }
    .func {
      display: flex;
      margin-top: 25px;
      justify-content: space-around;
      .star.active {
        border: 1px solid #f00;
      }
      .star,
      .wechat {
        width: 80px;
        height: 28px;
        font-size: 14px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #000;
        border-radius: 40px;
        .iconfont {
          font-size: 18px;
          margin-right: 5px;
          vertical-align: middle;
        }
        .iconweixin {
          color: #88d171;
        }
      }
    }
  }
  .comment-title {
    margin-top: 20px;
    h4 {
      text-align: center;
      padding: 10px 0;
      border: 3px solid #eee;
    }
  }
  .footer-active {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    padding: 20px 10px 5px;
    border-top: 1px solid #eee;
    background: #fff;
    textarea {
      box-sizing: border-box;
      width: 260px;
      height: 90px;
      padding: 15px;
      outline: none;
      border: none;
      background-color: #eee;
      border-radius: 5px;
      color: #666;
      font-size: 14px;
      resize: none;
    }
    .btn {
      height: 35px;
      border-radius: 5px;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    .reply {
      input {
        width: 180px;
        height: 30px;
        padding-left: 20px;
        font-size: 14px;
        border: none;
        border-radius: 15px;
        background-color: #d7d7d7;
      }
    }
    span[class] {
      font-size: 25px;
    }
    .comment {
      position: relative;
      #count {
        position: absolute;
        top: -8px;
        left: 8px;
        font-size: 8px;
        color: #fff;
        padding: 2px 6px;
        border-radius: 10px;
        background-color: #f00;
      }
    }
  }
}
</style>
