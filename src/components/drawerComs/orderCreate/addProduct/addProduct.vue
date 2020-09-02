<template>
  <div id='addProduct'
    class='innerDrawer'>
    <div class="titleCtn">
      <span class="title">添加产品</span>
      <span class="el-icon-close close_icon"
        @click="cancle"></span>
    </div>
    <div class="bodyCtn">
      <div class="itemCtn">
        <span class="title">
          <span class="text">产品信息</span>
        </span>
        <span class="rowCtn">
          <span class="label">产品款号</span>
          <span class="info">
            <zh-input v-model="code"
              class="inputs"
              placeholder="请输入产品款号"></zh-input>
          </span>
        </span>
        <span class="rowCtn">
          <span class="label">产品名称</span>
          <span class="info">
            <zh-input v-model="name"
              class="inputs"
              placeholder="请输入产品名称"></zh-input>
          </span>
        </span>
        <span class="rowCtn">
          <span class="label">产品其他信息</span>
          <span class="info">
            <zh-input v-model="other_info"
              class="inputs"
              placeholder="请输入产品其他信息"></zh-input>
          </span>
        </span>
      </div>
      <div class="itemCtn">
        <span class="title">
          <span class="text">产品细节</span>
        </span>
        <span class="rowCtn">
          <span class="label">配色方案</span>
          <span class="info w364"
            v-for="(itemColor,indexColor) in colors"
            :key="indexColor">
            <span class="numCtn">{{indexColor + 1}}</span>
            <zh-input v-model="itemColor.name"
              class="inputs"
              placeholder="请输入配色组"></zh-input>
            <span class="deleteBtn el-icon-delete"
              @click="deleteItem(colors,indexColor)"></span>
          </span>
          <span class="info w364">
            <span class="addBtn"
              @click="addItem(colors,'color')">添加配色</span>
          </span>
        </span>
        <span class="rowCtn">
          <span class="label">尺码克重</span>
          <span class="info"
            v-for="(itemSize,indexSize) in sizes"
            :key="indexSize">
            <zh-input v-model="itemSize.name"
              placeholder="尺码"
              class="inputs w94"></zh-input>
            <zh-input v-model="itemSize.size_info"
              placeholder="尺寸信息"
              class="inputs"></zh-input>
            <zh-input v-model="itemSize.weight"
              placeholder="克重"
              class="inputs w108">
              <template slot="append">g</template>
            </zh-input>
            <span class="deleteBtn el-icon-delete"
              @click="deleteItem(sizes,indexSize)"></span>
          </span>
          <span class="info">
            <span class="addBtn"
              @click="addItem(sizes,'size')">添加尺码</span>
          </span>
        </span>
        <span class="rowCtn">
          <span class="label">产品图片</span>
          <span class="info">
            <el-upload action="https://upload.qiniup.com/"
              :before-upload="beforeUpload"
              :data="postData"
              :file-list="file_arr"
              list-type="picture-card"
              ref="image">
              <i slot="default"
                class="el-icon-plus"
                style="font-size:30px;"></i>
            </el-upload>
          </span>
        </span>
      </div>
    </div>
    <div class="footCtn">
      <span class="btn btnGray"
        @click="cancle">取消</span>
      <span class="btn btnBlue"
        @click="commit">确定</span>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/assets/js/api.js'
export default {
  props: {
    datas: {
      type: Object
    }
  },
  data () {
    return {
      isChange: false,
      postData: { token: '' },
      code: '',
      name: '',
      other_info: '',
      colors: [{ name: '' }],
      sizes: [{ name: '', size_info: '', weight: '' }],
      file_arr: []
    }
  },
  methods: {
    commit () {
      if (!this.code) {
        this.$message.warning('请输入产品款号')
        return
      }
      if (!this.name) {
        this.$message.warning('请输入产品名称')
        return
      }
      if (this.colors.filter(itemF => itemF.name).length === 0) {
        this.$message.warning('请输入最少一种配色方案')
        return
      }
      if (this.sizes.filter(itemF => itemF.name).length === 0) {
        this.$message.warning('请输入最少一种尺码信息')
        return
      }
      let imageArr = this.$refs.image.uploadFiles.map((item) => { return (!item.response ? item.url : ('https://zhihui.tlkrzf.com/' + item.response.key)) })
      let data = {
        isChange: this.isChange,
        code: this.code,
        name: this.name,
        colors: this.colors.filter(itemF => itemF.name),
        sizes: this.sizes.filter(itemF => itemF.name),
        other_info: this.other_info,
        file_arr: imageArr
      }
      this.$emit('commit', data)
      this.$emit('close')
    },
    cancle () {
      this.$emit('close')
    },
    beforeUpload (file) {
      let fileName = file.name.lastIndexOf('.')// 取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length// 取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)// 截
      this.postData.key = Date.parse(new Date()) + '.' + fileFormat
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 6
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 6MB!')
        return false
      }
    },
    addItem (item, type) {
      if (type === 'color') {
        item.push({ name: '' })
      } else if (type === 'size') {
        item.push({ name: '', size_info: '', weight: '' })
      }
    },
    deleteItem (arr, index) {
      arr.splice(index, 1)
    }
  },
  created () {
    // if (this.token) {
    //   this.postData.token = this.token
    // } else {
    getToken().then(res => {
      res.data.status !== false && (this.postData.token = res.data.data)
    })
    console.log(this.datas)
    if (this.datas) {
      this.isChange = this.datas.isChange
      this.code = this.datas.code
      this.name = this.datas.name
      this.other_info = this.datas.other_info
      this.colors = this.datas.colors
      this.sizes = this.datas.sizes
      this.file_arr = this.datas.file_arr
    }
    // }
  }
}
</script>

<style scoped lang='less'>
@import "./addProduct.less";
</style>
<style lang="less" scoped>
.el-drawer__body {
  height: 100%;
}
.el-drawer {
  min-width: 520px !important;
}
</style>
