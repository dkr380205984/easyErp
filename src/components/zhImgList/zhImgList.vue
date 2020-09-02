<template>
  <div class="zh_img_list"
    @click.stop="(type === 'show' ? showBig() : goRouter())">
    <div class="hover_bg">
      <div class="handle_btn_context">
        <span class="left el-icon-arrow-left handle_btn_item"
          @click.stop="firstFlag ? false : index--"></span>
        <span class="right el-icon-arrow-right handle_btn_item"
          @click.stop="lastFlag ? false : index++"></span>
      </div>
      <div class="index_info">
        {{(index+1) + ' / ' + selfList.length}}<br />{{type === 'show' ? '点击查看' : '查看详情'}}
      </div>
    </div>
    <img :src="selfList[index][showThumb] || defaultImage"
      class="img"
      :onerror="defaultImg">
    <div class="zh_img_screen"
      v-show="isClickFlag">
      <!--此处click事件是为了防止冒泡，prevent修饰符不知为何没用了-->
      <div class="close"
        @click.stop="isClickFlag = !isClickFlag">点此退出预览</div>
      <div class="zh_img_box">
        <img :src="selfList[index][showImg] || selfList[index].file_url || defaultImage"
          :onerror="defaultImg"
          class="screen_img">
        <div class="left handle_btn_item el-icon-arrow-left"
          @click.stop="firstFlag ? false : index--"></div>
        <div class="right handle_btn_item el-icon-arrow-right"
          @click.stop="lastFlag ? false : index++"></div>
        <ul class="handle_indicator">
          <li v-for="(item,key) in selfList"
            :class="index === key ? 'active' : ''"
            :key="key"
            @click="index = key"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    pro_id: [String, Number],
    showThumb: {
      type: String,
      default: 'thumb'
    },
    showImg: {
      type: String,
      default: 'image_url'
    },
    showId: {
      type: String,
      default: 'product_id'
    },
    type: {
      type: String,
      default: 'show',
      validator: (value) => {
        return value === 'show' || value === 'open'
      }
    },
    order_type: {
      type: String,
      default: 'product',
      validator: (value) => {
        return value === 'product' || value === 'sample'
      }
    }
  },
  data () {
    return {
      index: 0,
      lastFlag: false,
      firstFlag: true,
      isClickFlag: false,
      defaultImage: require('@/assets/image/noPic.jpg'),
      defaultImg: 'this.src="' + require('@/assets/image/noPic.jpg') + '"'
    }
  },
  watch: {
    index (newVal) {
      if (newVal === this.selfList.length - 1) {
        this.lastFlag = true
      } else {
        this.lastFlag = false
      }
      if (newVal === 0) {
        this.firstFlag = true
      } else {
        this.firstFlag = false
      }
    },
    list: {
      deep: true,
      handler (newVal) {
        if (this.index > 0) {
          this.firstFlag = false
        } else {
          this.firstFlag = true
        }
        if (this.index === this.selfList.length - 1) {
          this.lastFlag = true
        } else {
          this.lastFlag = false
        }
      }
    }
  },
  methods: {
    showBig () {
      this.isClickFlag = true
    },
    goRouter () {
      if (!this.list[this.index] || !this.list[this.index].product_id) {
        this.$message.error('该图片暂无产品信息,将为您打开大图预览模式')
        this.showBig()
        return
      }
      if (this.order_type === 'sample' || +this.list[this.index].product_type === 2) {
        this.$openUrl('/sample/sampleDetail/' + this.list[this.index].product_id)
      } else if (this.order_type === 'product' || +this.list[this.index].product_type === 1) {
        this.$openUrl('/product/productDetail/' + this.list[this.index].product_id)
      }
    }
  },
  computed: {
    selfList () {
      return !this.list || this.list.length === 0 ? [{
        image_url: '',
        thumb: '',
        product_id: ''
      }] : this.list
    }
  },
  mounted () {
    if (this.list.length === 1 || this.list.length === 0) {
      this.firstFlag = true
      this.lastFlag = true
    }
  }
}
</script>

<style scoped lang="less">
@import "./zhImgList.less";
</style>
