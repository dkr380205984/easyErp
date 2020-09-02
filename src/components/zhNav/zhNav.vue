<template>
  <div class="zhNavCtn">
    <el-menu mode="horizontal"
      style="height:100%;border-bottom:0"
      text-color="#fff"
      active-text-color="#1A94FF"
      background-color="#2E394F"
      router
      @select="hanldeSelect">
      <template v-for="(item,index) in renderData">
        <template v-if="item.children&&item.children.length>0">
          <el-submenu :key="index"
            :index="index.toString() + 'item'">
            <template slot="title">
              <span class="iconFont"
                :class="item.icon"></span>
              <span style="font-size:16px;vertical-align: 0px;">{{item.name}}</span>
            </template>
            <template v-for="(itemChild,indexChild) in item.children">
              <template v-if="itemChild.children&&itemChild.children.length>0">
                <el-submenu :key="indexChild"
                  :index="indexChild.toString() + 'itemChild'">
                  <template slot="title">
                    <span class="iconFont"
                      :class="itemChild.icon"></span>
                    <span style="font-size:14px;vertical-align: 0px;">{{itemChild.name}}</span>
                  </template>
                  <el-menu-item v-for="(itemGrand,indexGrand) in itemChild.children"
                    :key="indexGrand"
                    :index="itemGrand.url">
                    <template slot="title">
                      <span>{{itemGrand.name}}</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :key="indexChild"
                  :index="itemChild.url">
                  <template slot="title">
                    <span class="iconFont"
                      :class="itemChild.icon"></span>
                    <span style="font-size:14px;vertical-align: 0px;">{{itemChild.name}}</span>
                  </template>
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="index"
            :index="item.url">
            <template slot="title">
              <span class="iconFont"
                :class="item.icon"></span>
              <span style="font-size:16px;vertical-align: 0px;">{{item.name}}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    maxLength: {
      type: [Number, String],
      default: 99,
      validator: function (value) {
        return /^[1-9]\d*$/.test(Number(value))
      }
    }
  },
  computed: {
    renderData () {
      if (this.data.length < this.maxLength) {
        return this.data
      } else {
        return [...this.data.slice(0, this.maxLength), {
          name: '...',
          children: this.data.slice(this.maxLength, this.data.length)
        }]
      }
    }
  },
  methods: {
    hanldeSelect (val) {

    }
  }
}
</script>
<style lang="less" scropd>
@import "./zhNav.less";
</style>
