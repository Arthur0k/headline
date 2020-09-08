<template>
  <div id="NavItem" @click="go">
    <div class="container">
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
#NavItem {
  .container {
    display: flex;
    height: 50px;
    line-height: 50px;
    margin: 0 20px;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    .content {
      flex: 1;
      text-align: right;
      color: #666;
    }
    .icon {
      margin-left: 10px;
    }
  }
}
</style>
