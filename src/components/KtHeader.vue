<template>
  <div id="KtHeader">
    <div class="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title">
      <slot></slot>
    </div>
    <div class="extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
#KtHeader {
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
  .back,
  .extra {
    width: 60px;
    height: 50px;
  }
  .title {
    flex: 1;
    font-weight: 700;
    font-size: 18px;
  }
}
</style>
