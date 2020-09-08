<template>
  <div class="manage">
    <ak-header>栏目管理</ak-header>
    <div class="content">
      <div class="active">
        <h3>点击删除以下频道(必须保留4项以上)</h3>
        <div class="list">
          <div
            class="item"
            v-for="item in activeList"
            :key="item.id"
            @click="delTab(item.id)"
          >{{item.name}}</div>
        </div>
      </div>
      <div class="deactive">
        <h3>点击添加以下频道</h3>
        <div class="list">
          <div
            class="item"
            v-for="item in deactiveList"
            :key="item.id"
            @click="addTab(item.id)"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
  思路
    1. 发送ajax请求，获取到所有的栏目，存放activeList
    2. 渲染这些栏目
    3. 点击激活的栏目， 删除该栏目，并且添加未激活的数组
    4. 点击未激活的栏目，删除该栏目，添加到激活的栏目中
    5. 监听数据的变化，保存到localStorage中
*/
export default {
  data() {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  methods: {
    async getTabList() {
      if (localStorage.getItem('activeList')) {
        this.activeList = JSON.parse(localStorage.getItem('activeList'))
        this.deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeList = data
        console.log(this.activeList)
      }
    },
    delTab(id) {
      if (this.activeList.length <= 4) {
        return this.$toast('别点了')
      }
      const a = this.activeList.splice(this.activeList.findIndex(item => item.id === id), 1)
      this.deactiveList.push(...a)
    },
    addTab(id) {
      const a = this.deactiveList.splice(this.deactiveList.findIndex(item => item.id === id), 1)
      this.activeList.push(...a)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler(value) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  },
  created() {
    this.getTabList()
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  .active,
  .deactive {
    h3 {
      font-size: 14px;
      font-weight: 400;
      margin: 10px 0;
    }
    .list {
      overflow: hidden;
      .item {
        width: 60px;
        height: 30px;
        border: 1px solid #ccc;
        background-color: #eee;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        float: left;
        margin: 5px 10px;
      }
    }
  }
}
</style>
