<template>
  <div id="app">
    <keep-alive include="index">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.box {
  width: 150px;
  height: 150px;
  background-color: red;
}
</style>
