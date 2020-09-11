<template>
  <div class='deduct'>
    <slot />
    <div class="popup"
      v-if="value">
      <div class="main"
        v-if="!showType"
        v-loading='!showType && loading'>
        <div class="titleCtn">
          <div class="text">扣款记录</div>
          <i class="el-icon-close close_icon"
            @click.stop="changeShow"></i>
        </div>
        <div class="contentCtn">
          <el-timeline>
            <el-timeline-item v-for="(item, index) in deductLogInfo"
              :key="index">
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="title_box"
                      style="width:100%;display:flex;justify-content: space-between;align-items:center">
                      <div>
                        <span style="color:rgba(0,0,0,0.65);">{{item.complete_time?$getTime(item.complete_time):'有问题'}}</span>
                        <span style="margin-left:20px">金额：
                          <span style="font-size:14px">{{$formatNum(item.deduct_price || item.settle_price || 0)}}元</span>
                        </span>
                      </div>
                      <div class="blue"
                        style="margin-right:20px"
                        @click.stop="goSettleDeductDetail(item)">查看详情</div>
                    </span>
                  </template>
                  <div class="collapseBox">
                    <span class="label">包含订单：</span>
                    <span class="info">
                      <el-tag v-for="order in item.order_code"
                        :key="order.order_code">{{order.order_code}}</el-tag>
                    </span>
                  </div>
                  <div class="collapseBox">
                    <span class="label">扣款原因：</span>
                    <span class="info">{{item.desc}}</span>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="oprCtn">
          <div class="opr gray"
            @click.stop="changeShow">关闭</div>
          <div class="opr blue"
            @click.stop="changeShow">确定</div>
        </div>
      </div>
      <div class="main"
        v-else
        v-loading='showType && loading'>
        <div class="titleCtn">
          <span class="text">单位扣款</span>
          <span class="el-icon-close close_icon"
            @click="changeShow"></span>
        </div>
        <div class="contentCtn">
          <div class="row">
            <span class="label isMust">扣款单位：</span>
            <span class="info">
              <el-select v-model="deductEditInfo.client_id"
                filterable
                placeholder="请选择需要扣款的单位">
                <el-option v-for="item in clientList"
                  :key="item.client_id"
                  :label="item.client_name"
                  :value="item.client_id + '-' + item.type">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="row">
            <div class="label isMust">扣款日期：</div>
            <div class="info">
              <el-date-picker style="width:100%"
                v-model="deductEditInfo.time"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
          <div class="row">
            <span class="label isMust">扣款金额：</span>
            <span class="info">
              <zh-input type='number'
                v-model=" deductEditInfo.price"
                placeholder="请输入需要扣除款项的金额">
                <template slot="append">元</template>
              </zh-input>
            </span>
          </div>
          <div class="row">
            <span class="label">扣款原因：</span>
            <span class="info">
              <zh-input v-model="deductEditInfo.remark"
                placeholder="请输入扣款原因">
              </zh-input>
            </span>
          </div>
        </div>
        <div class="oprCtn">
          <span class="opr"
            @click="changeShow">取消</span>
          <span class="opr blue"
            @click="saveDeduct">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chargebacks } from '@/assets/js/api.js'
export default {
  props: {
    clientList: {
      type: Array,
      default: () => {
        return []
      }
    },
    orderId: {
      type: Number,
      required: true
    },
    orderType: {
      type: Number,
      required: true,
      validator: (value) => {
        return value === 1 || value === 2
      }
    },
    value: {
      type: Boolean,
      default: false
    },
    showType: {
      type: Boolean,
      default: true // true为扣款窗口false为扣款日志
    },
    logType: {
      type: [Array, Object],
      default: null,
      validator: (value) => {
        const type = Object.prototype.toString.call(value) === '[object Array]'
        return type || value === null
      }
    }
  },
  data () {
    return {
      loading: true,
      deductLogInfo: [],
      deductEditInfo: {
        client_id: '',
        price: '',
        time: this.$getTime(),
        remark: ''
      }
    }
  },
  methods: {
    changeShow () {
      this.$emit('input', !this.value)
    },
    // 获取扣款日志
    getDeductLog () {
      this.loading = true
      chargebacks.log({
        order_type: this.orderType,
        order_id: this.orderId,
        type: this.logType
      }).then((res) => {
        if (res.data.status !== false) {
          this.deductLogInfo = res.data.data
          this.loading = false
        }
      })
    },
    saveDeduct () {
      this.loading = true
      if (!this.deductEditInfo.client_id) {
        this.$message.error('请选择需要扣款的合作单位')
        return
      }
      if (!this.deductEditInfo.price) {
        this.$message.error('请填写需要扣除款项的金额')
        return
      }
      chargebacks.create({
        id: null,
        client_id: this.deductEditInfo.client_id.split('-')[0],
        order_id: JSON.stringify([this.orderId]),
        complete_time: this.deductEditInfo.time,
        deduct_price: this.deductEditInfo.price,
        desc: this.deductEditInfo.remark,
        order_type: this.orderType,
        type: this.deductEditInfo.client_id.split('-')[1]
      }).then((res) => {
        if (res.data.status) {
          this.$message.success('扣款成功')
          this.deductEditInfo = {
            client_id: '',
            price: '',
            remark: ''
          }
          this.getDeductLog()
          this.changeShow()
          this.loading = false
        }
      })
    },
    goSettleDeductDetail (item) {
      this.$router.push(`/financialStatistics/oprDetail/${item.client_id}/${item.type}/${item.id}/扣款?orderId=${item.order_code.map(itemM => itemM.order_id).join(',')}&orderType=${item.order_type}`)
    }
  },
  created () {
    this.getDeductLog()
  }
}
</script>

<style scoped lang='less'>
@import "./zhDeduct.less";
</style>
<style lang="less">
.popup {
  .el-timeline {
    padding: 0;
  }
  .el-timeline-item {
    padding-bottom: 0px;
    margin-bottom: -9px;
  }
  .el-collapse-item__header {
    min-height: 46px;
    height: 46px;
  }
  .el-timeline-item__tail {
    margin-top: 14px;
    // border-color: #1a95ff;
  }
  // .el-timeline-item__node {
  //   background-color: #1a95ff;
  // }
  .el-timeline-item__node--normal {
    margin-top: 14px;
  }
  .collapseBox {
    margin: 12px;
  }
}
</style>
