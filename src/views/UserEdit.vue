<template>
  <div id="UserEdit">
    <ak-header>编辑资料</ak-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt />
    </div>
    <ak-nav-item @click.native="showNick">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </ak-nav-item>
    <ak-nav-item @click.native="showPass">
      <template>密码</template>
      <template #content>******</template>
    </ak-nav-item>
    <ak-nav-item @click.native="showGen">
      <template>性别</template>
      <template #content>{{user.gender===1?'男':'女'}}</template>
    </ak-nav-item>
    <van-dialog
      class="container"
      v-model="show"
      @confirm="updateNick"
      title="修改昵称"
      show-cancel-button
    >
      <van-field class="pad" v-model="nickname" />
    </van-dialog>
    <van-dialog
      class="container"
      v-model="showP"
      @confirm="updatePass"
      title="修改密码"
      show-cancel-button
    >
      <van-field class="pad" v-model="password" />
    </van-dialog>
    <van-dialog v-model="showG" title="标题" @click="showGen" @confirm="updateGen" show-cancel-button>
    <van-radio-group v-model="gender" >
      <van-cell-group>
        <van-cell title="男" clickable @click="gender = 1">
          <template #right-icon>
            <van-radio :name="1" />
          </template>
        </van-cell>
        <van-cell title="女" clickable @click="gender = 0">
          <template #right-icon>
            <van-radio :name="0" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      show: false,
      showP: false,
      nickname: '',
      id: 0,
      password: '',
      gender: 0,
      showG: false
    }
  },
  methods: {
    /**
     * 业务相关
     */
    showPass() {
      this.password = this.user.password
      this.showP = true
    },
    showNick() {
      this.nickname = this.user.nickname
      this.show = true
    },
    showGen() {
      this.showG = true
    },
    updateNick() {
      this.update({ nickname: this.nickname })
    },
    updatePass() {
      this.update({ password: this.password })
    },
    updateGen() {
      this.update({ gender: this.gender })
    },
    async update(data) {
      const res = await this.$axios.post(`/user_update/${this.id}`, data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.getUserData()
      }
    },
    /**
     * 网络请求相关
     */
    async getUserData() {
      this.id = localStorage.getItem('id')
      const token = localStorage.getItem('token')
      const res = await this.$axios.get(`/user/${this.id}`, {
        headers: { authorization: token }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    }
  },
  created() {
    this.getUserData()
  }
}
</script>

<style lang="less" scoped>
#UserEdit {
  .avatar {
    padding: 40px 0;
    text-align: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .pad {
    padding: 10px;
  }
}
</style>
