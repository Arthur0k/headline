<template>
  <div id="Comment">
    <div class="content">
      <img :src="$url(comment.user.head_img)" alt />
      <div class="user">
        <div class="nickname">{{comment.user.nickname}}</div>
        <div class="date">{{comment.create_date | now}}</div>
      </div>
      <div class="reply" @click="onReply">回复</div>
    </div>
    <ak-floor v-if="comment.parent" :comment="comment.parent"></ak-floor>
    <div class="comment">{{comment.content}}</div>
  </div>
</template>

<script>
import AkFloor from 'components/AkFloor'

export default {
  components: {
    AkFloor
  },
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    onReply() {
      console.log(this.comment)
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    }
  }
}
</script>

<style lang="less" scoped>
#Comment {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  .content {
    display: flex;
    margin-bottom: 10px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .user {
      flex: 1;
      margin-left: 10px;
      font-size: 14px;
      .date {
        font-size: 12px;
        color: #666;
      }
    }
    .reply {
      margin-right: 10px;
      font-size: 12px;
      color: #666;
    }
  }
  .comment {
    margin-top: 15px;
    font-size: 14px;
  }
}
</style>
