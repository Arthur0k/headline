<template>
  <div>
    <floor :comment="comment.parent" v-if="comment.parent"></floor>
    <div id="AkFloor">
      <div class="user">
        <div class="nickname">{{sequence}}.{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | now}}</div>
        <div class="reply" @click="onReply">回复</div>
      </div>
      <div class="comment">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
import { getCount } from 'utils/tools'

export default {
  name: 'floor',
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    sequence() {
      return getCount(1, this.comment)
    }
  },
  methods: {
    onReply() {
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    }
  }
}
</script>

<style lang="less" scoped>
#AkFloor {
  padding: 12px 10px;
  margin-top: -1px;
  border: 1px solid #666;
  .user {
    display: flex;
    align-items: center;
    .nickname {
      font-size: 14px;
    }
    .time {
      flex: 1;
      margin-left: 15px;
      color: #666;
      font-size: 12px;
    }
    .reply {
      color: #666;
      font-size: 12px;
    }
  }
  .comment {
    margin-top: 15px;
    font-size: 14px;
  }
}
</style>
