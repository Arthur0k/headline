<template>
  <div id="AkHeader">
    <div class="back" @click="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title"><slot></slot></div>
    <div class="extra"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
#AkHeader {
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #eee;
  .back,
  .extra {
    width: 50px;
    height: 50px;
 }
  .title {
    flex: 1;
    font-size: 16px;
    text-align: center;
  }
}
</style>
