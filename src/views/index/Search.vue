<template>
  <div id="Search">
    <div class="header">
      <div class="back" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="search">
        <input
          type="search"
          placeholder="通灵消失之术"
          v-model="keyword"
          @keyup.enter="search"
          @input="onInput"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="text" @click="search">搜索</div>
    </div>
    <div class="recommend" v-if="recommendList.length">
      <div
        class="recommend-item"
        v-for="item in recommendList"
        :key="item.id"
        @click="onRecommend(item)"
      >{{item.title}}</div>
    </div>
    <div v-else-if="list.length>0">
      <ak-post v-for="item in list" :post="item" :key="item.id"></ak-post>
    </div>
    <div class="main" v-else>
      <div class="history">
        <div class="title">历史记录</div>
        <div class="content">
          <div @click="onHistory(item)" class="item" v-for="item in historyList" :key="item">{{item}}</div>
        </div>
      </div>
      <div class="hot">
        <div class="title">热门搜索</div>
        <div class="content">
          <div class="item">办公室小野否认解散</div>
          <div class="item">办公室小野否认解散</div>
          <div class="item">办公室小野否认解散</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AkPost from 'components/AkPost'
import { deBounce } from 'utils/tools'

export default {
  components: {
    AkPost
  },
  data() {
    return {
      keyword: '',
      list: [],
      historyList: [],
      recommendList: []
    }
  },
  created() {
    this.historyList = JSON.parse(localStorage.getItem('historyList')) || []
  },
  methods: {
    onHistory(item) {
      this.keyword = item
    },
    onRecommend(item) {
      this.keyword = item.title
    },
    onInput: deBounce(async function () {
      if (!this.keyword) {
        this.recommendList = []
        return
      }
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
      }
    }, 1000),
    back() {
      if (this.keyword) {
        this.keyword = ''
        this.list = []
        this.recommendList = []
      } else {
        this.$router.back()
      }
    },
    async search() {
      this.recommendList = []
      if (this.historyList.includes(this.keyword)) {
        this.historyList = this.historyList.filter(
          item => item !== this.keyword
        )
      }
      this.historyList.unshift(this.keyword)
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
#Search {
  .header {
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50%;
    text-align: center;
    .back,
    .text {
      width: 40px;
    }
    .search {
      position: relative;
      flex: 1;
      input {
        width: 100%;
        height: 36px;
        padding-left: 35px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 18px;
        input[type='search']::-webkit-search-cancel-button {
          -webkit-appearance: none; //此处只是去掉默认的小×
        }
      }
      .iconfont {
        position: absolute;
        top: 12px;
        left: 15px;
      }
    }
    .text {
      font-size: 14px;
    }
  }
  .recommend {
    padding: 15px;
    .recommend-item {
      font-size: 14px;
      padding: 5px 0;
      border-bottom: 1px solid #ddd;
    }
  }
  .history,
  .hot {
    padding: 20px;
    border-bottom: 1px solid #ddd;
    .title {
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 700;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      .item {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 5px 10px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
      }
    }
  }
}
</style>
