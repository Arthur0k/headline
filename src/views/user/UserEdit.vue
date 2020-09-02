<template>
  <div id="UserEdit">
    <ak-header>编辑资料</ak-header>
    <div class="avatar">
      <van-uploader class="uploader" :after-read="afterRead" />
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
      <van-radio-group v-model="gender">
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
    <div class="cropper" v-show="isShowImg">
      <vue-cropper
        autoCrop
        autoCropWidth="100"
        autoCropHeight="100"
        :info="false"
        fixed
        :img="upLoadFile"
        ref="cropper"
        :after-read="afterRead"
      ></vue-cropper>
      <van-button class="left-btn" type="primary" @click="cancel">取消</van-button>
      <van-button class="right-btn" type="danger" @click="cropper">确定</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: {},
      show: false,
      showP: false,
      nickname: '',
      id: 0,
      password: '',
      gender: 0,
      showG: false,
      isShowImg: false,
      upLoadFile: ''
    }
  },
  methods: {
    /**
     * 业务相关
     */
    cancel() {
      this.isShowImg = false
    },
    cropper() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          await this.update({ head_img: data.url })
          this.isShowImg = false
        }
      })
    },
    isImg(type) {
      if (
        type.includes('png') ||
        type.includes('gif') ||
        type.includes('jpg') ||
        type.includes('jpeg')
      ) {
        return true
      } else {
        return false
      }
    },
    afterRead(file) {
      const { type, size } = file.file
      if (!this.isImg(type)) {
        return this.$toast.fail('图片格式不正确')
      }
      if (size > 200 * 1024) {
        return this.$toast.fail('图片大小不能超过200kb')
      }
      this.isShowImg = true
      this.upLoadFile = file.content
    },
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
    position: relative;
    padding: 40px 0;
    text-align: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .uploader {
      position: absolute;
      width: 70px;
      height: 70px;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
  .pad {
    padding: 10px;
  }
  .cropper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .left-btn,
    .right-btn {
      position: absolute;
      top: 0;
    }
    .right-btn {
      right: 0;
    }
  }
}
</style>
