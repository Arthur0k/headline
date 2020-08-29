<template>
  <div id="AkNavItem" @click="go">
    <div class="title">
      <slot></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="icon">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String
    }
  },
  methods: {
    go() {
      if (this.path) {
        this.$router.push(this.path)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#AkNavItem {
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  height: 50px;
  line-height: 50px;
  margin-left: 15px;
  margin-right: 10px;
  .content {
    flex: 1;
    text-align: right;
    color: #999;
  }
}
</style>
