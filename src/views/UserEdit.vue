<template>
  <div id="UserEdit">
    <kt-header>编辑资料</kt-header>
    <div class="img">
      <img :src="$axios.defaults.baseURL + user.head_img" alt />
    </div>
    <nav-item @click.native="showNick">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </nav-item>
    <nav-item @click.native="showPass">
      <template>密码</template>
      <template #content>******</template>
    </nav-item>
    <nav-item @click.native="showGen">
      <template>性别</template>
      <template #content>{{user.gender===1?'男':'女'}}</template>
    </nav-item>
    <van-dialog @confirm="updateNick" v-model="showN" title="用户名" show-cancel-button>
      <van-cell-group>
        <van-field v-model="nickname" placeholder="请输入用户名" />
      </van-cell-group>
    </van-dialog>
    <van-dialog @confirm="updatePass" v-model="showP" title="密码" show-cancel-button>
      <van-cell-group>
        <van-field v-model="password" placeholder="请输入密码" />
      </van-cell-group>
    </van-dialog>
    <van-dialog @confirm="updateGen" v-model="showG" title="性别" show-cancel-button>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="radio = '0'">
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
import NavItem from 'components/NavItem'

export default {
  components: {
    NavItem
  },
  data() {
    return {
      user: {},
      showN: false,
      showG: false,
      showP: false,
      nickname: '',
      password: '',
      gender: 0
    }
  },
  methods: {
    /*
     * 业务相关
     */
    showNick() {
      this.showN = true
      this.nickname = this.user.nickname
    },
    updateNick() {
      this.update({ nickname: this.nickname })
    },
    showPass() {
      this.showP = true
      this.password = this.user.password
    },
    updatePass() {
      this.update({ password: this.password })
    },
    showGen() {
      this.showG = true
      this.gender = this.user.gender
    },
    updateGen() {
      this.update({ gender: this.gender })
    },
    /**
     * 网络相关
     */
    async update(data) {
      const userid = localStorage.getItem('userid')
      const res = await this.$axios.post(`/user_update/${userid}`, data)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast('修改成功')
        this.getUserInfo()
      }
    },
    async getUserInfo() {
      const userid = localStorage.getItem('userid')
      const res = await this.$axios.get(`/user/${userid}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
#UserEdit {
  .img {
    text-align: center;
    padding: 40px;
    img {
      width: 80px;
      height: 80px;
      vertical-align: middle;
    }
  }
}
</style>
