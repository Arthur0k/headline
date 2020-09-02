<template>
  <div id="MyCollect">
    <ak-header>我的收藏</ak-header>
    <div class="mycollect">
      <div class="collect-item">
        <div class="title">林志玲换透视黑纱裙米兰看秀腹部微隆显孕味</div>
        <div class="info">
          <span class="name">火星时报</span>
          <span class="followCount">52跟帖</span>
        </div>
      </div>
      <img src="~assets/logo.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
#MyCollect {
  .mycollect {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    .collect-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 16px;
      .title {
        margin-top: 10px;
      }
      .info {
        margin-top: 15px;
          font-size: 14px;
          color: #666;
        .name {
          margin-right: 15px;
        }
      }
    }
    img {
      width: 120px;
      height: 75px;
    }
  }
}
</style>
