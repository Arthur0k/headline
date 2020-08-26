<template>
  <div id="app">
    <h1>this is app</h1>
    <router-link to="/login">login</router-link>
    <router-link to="/register">register</router-link>
    <router-view></router-view>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
