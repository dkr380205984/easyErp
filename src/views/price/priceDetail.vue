<template>
  <div id='priceDetail'
    class='indexMain'
    v-loading="loading">
    <div class="module">
      <!-- <zh-transition v-if="priceContactArr.length > 1"
        v-model="transitionIndex"
        :list="priceContactArr"
        showKey='name'
        @changed="changePrice"></zh-transition> -->
      <div class="titleCtn">
        <span class="title hasBorder">报价单信息</span>
      </div>
      <div class="detailCtn">
        <div class="floatRight">
          <div class="btnCtn">
            <div class="btn btnBlue"
              v-if="has_check==='1'"
              @click="checkFlag = true">审核</div>
          </div>
          <div class="otherInfo">
            <div class="block">
              <span class="label">状态</span>
              <el-tooltip class="item"
                effect="dark"
                :content="status === 1 ? '待审核' : (status === 2 ? '审核通过' : reason)"
                placement="bottom">
                <span :class="['text',status === 1 ? 'blue' : (status === 2 ? 'green' : 'red')]">{{status|filterStatus}}</span>
              </el-tooltip>
            </div>
            <div class="block">
              <span class="label">订单金额</span>
              <span class="text">￥{{total_price ? total_price : 0}}</span>
            </div>
          </div>
        </div>
        <div :class="['statuIcon',status === 1 ? 'reasoning' : false,status === 3 ? 'pass' : false,status === 2 ? 'tongguo' : false]"></div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">报价单号：</span>
            <span class="text">{{code}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">报价名称：</span>
            <span class="text">{{price_name}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">审核人：</span>
            <span class="text">{{check_user?check_user:'暂无'}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">审核时间：</span>
            <span class="text">{{check_time?check_time:'暂无'}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">外贸公司：</span>
            <span class="text">{{client_name}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">联系人：</span>
            <span class="text">{{contact_man}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">结算单位：</span>
            <span class="text">{{unit}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">结算汇率：</span>
            <span class="text">{{exchange_rate}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">创建人：</span>
            <span class="text">{{create_user}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">更新时间：</span>
            <span class="text">{{update_time}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title hasBorder">产品信息</span>
      </div>
      <div class="detailCtn">
        <!-- <div class="rowCtn">
          <div class="colCtn">
            <span class="label">起订数量：</span>
            <span class="text">{{set_num}}件</span>
          </div>
        </div> -->
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">起订备注：</span>
            <span class="text">{{set_desc ? set_desc : '暂无备注'}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">产品需求：</span>
            <span class="text">{{product_need ? product_need : '暂无需求'}}</span>
          </div>
        </div>
        <!-- <div class="rowCtn">
          <div class="colCtn">
            <span class="label">产品信息：</span>
            <span class="rectCtn">
              <el-carousel trigger="click"
                :autoplay="false"
                style="width:654px;height:212px">
                <el-carousel-item v-for="(item,index) in product_info"
                  :key="index">
                  <zh-card :data="item"
                    :key="index"></zh-card>
                </el-carousel-item>
              </el-carousel>
            </span>
          </div>
        </div> -->
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">产品文件：</span>
            <span class="imgCtn"
              v-if="file_url.length>0">
              <el-image style="width: 100px; height: 100px"
                :src="file_url[0]"
                :preview-src-list="file_url">
              </el-image>
            </span>
            <span class="text"
              v-else>暂无</span>
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title hasBorder">报价信息</span>
      </div>
      <div class="priceInfoCtn hasBorder">
        <div class="priceInfo_item">
          <div class="item_title samllPadding item_row bold">产品费用</div>
          <div class="item_row bold">
            <span class="item_col flex_18">名称</span>
            <span class="item_col">克重/数量</span>
            <span class="item_col">单价</span>
            <span class="item_col">损耗</span>
            <span class="item_col flex_7">其他</span>
            <span class="item_col right flex_7">总价</span>
          </div>
          <div class="item_row"
            v-for="(item,index) in price_info"
            :key="index">
            <span class="item_col flex_18">{{item.name}}</span>
            <span class="item_col">{{item.number ? item.number + (item.unit || '') : '/'}}</span>
            <span class="item_col">{{item.price ? item.price + '元' : '/'}}</span>
            <span class="item_col">{{item.sunhao ? item.sunhao + '%' : '/'}}</span>
            <span class="item_col flex_7">{{item.other ? item.other : '/'}}</span>
            <span class="item_col right flex_7">{{item.totalPrice ? item.totalPrice + '元' : '0元'}}</span>
          </div>
          <div class="item_row item_title"
            style="padding:0 40px">
            <span class="item_col flex_18">
              <span class="fontBold">合计</span>
            </span>
            <span class="item_col right flex_7">
              <span class="fontBold">{{price_info|filterTotal}}</span>元
            </span>
          </div>
        </div>
        <div class="priceInfo_item">
          <div class="item_title samllPadding item_row bold">订单费用</div>
          <div class="item_row bold">
            <span class="item_col flex_7">名称</span>
            <span class="item_col right">费用比例</span>
            <span class="item_col right">总价</span>
          </div>
          <div class="item_row"
            v-for="(item,index) in basic_info"
            :key="index">
            <span class="item_col flex_7">{{item.name}}</span>
            <span class="item_col right">{{item.prop ? item.prop + '%' : '/'}}</span>
            <span class="item_col right ">{{item.totalPrice ? item.totalPrice + '元' : '0元'}}</span>
          </div>
          <div class="item_row item_title"
            style="padding:0 40px">
            <span class="item_col flex_18">
              <span class="fontBold">合计</span>
            </span>
            <span class="item_col right flex_7">
              <span class="fontBold">{{basic_info|filterTotal}}</span>元
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="popup"
      v-show="checkFlag">
      <div class="main">
        <div class="title">
          <div class="text">审核报价单</div>
          <i class="el-icon-close"
            @click="checkFlag=false"></i>
        </div>
        <div class="content">
          <div class="row">
            <div class="label">审核意见：</div>
            <div class="info"
              style="line-height:32px">
              <el-radio v-model="ifPass"
                :label="true">通过</el-radio>
              <el-radio v-model="ifPass"
                :label="false">驳回</el-radio>
            </div>
          </div>
          <!-- <div class="row">
            <div class="label">开启通知：</div>
            <div class="info"
              style="line-height:32px">
              <el-radio v-model="ifMsg"
                :label="1">总是通知</el-radio>
              <el-radio v-model="ifMsg"
                :label="2">只在驳回时通知</el-radio>
              <el-radio v-model="ifMsg"
                :label="3">关闭通知</el-radio>
              <el-radio v-model="ifMsg"
                :label="4">只在通过时通知</el-radio>
            </div>
          </div> -->
          <div class="row">
            <div class="label">驳回理由：</div>
            <div class="info">
              <el-input type="textarea"
                placeholder="请输入备注信息（不超过30个字）"
                v-model="checkReason"
                :disabled="ifPass"
                maxlength="30"
                show-word-limit>
              </el-input>
            </div>
          </div>
          <div class="row">
            <div class="label">常见选项：</div>
            <div class="info">
              <el-checkbox-group v-model="checkList">
                <el-checkbox :disabled="ifPass"
                  label="物料价格偏低"></el-checkbox>
                <el-checkbox :disabled="ifPass"
                  label="织造费用偏低"></el-checkbox>
                <el-checkbox :disabled="ifPass"
                  label="加工费用偏低"></el-checkbox>
                <el-checkbox :disabled="ifPass"
                  label="包装费用偏低"></el-checkbox>
                <el-checkbox :disabled="ifPass"
                  label="人工费用偏低"></el-checkbox>
                <el-checkbox :disabled="ifPass"
                  label="运输费用偏低"></el-checkbox>
                <el-checkbox :disabled="ifPass"
                  label="基本利润偏低"></el-checkbox>
                <el-checkbox :disabled="ifPass"
                  label="整体报价偏低"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="opr">
          <div class="btn btnGray"
            @click="checkFlag=false">取消</div>
          <div class="btn btnBlue"
            @click="checkPrice">确定</div>
        </div>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray"
            @click="$router.go(-1)">返回</div>
          <div class="btn btnOrange"
            @click="$router.push('/price/priceUpdate/' + activePriceId)">修改</div>
          <div class="btn btnOrange"
            @click="$router.push('/price/priceGiveAgain/' + activePriceId)">再次报价</div>
          <div class="btn btnBlue"
            @click="$openUrl('/pricePrintTable/'+ activePriceId)">打印</div>
        </div>
        <div class="priceCtn">
          <span class="title">总价：</span>
          <span class="content">
            <span class="price">{{total_price}}</span>
            元
          </span>
          <span class="content marginLeft"
            v-if="unit && unit !== '元'">
            <span class="price">{{Number(total_price / exchange_rate * 100).toFixed(2)}}</span>
            {{unit}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { price, notify } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      has_check: window.sessionStorage.getItem('has_check'),
      ifMsg: 1,
      checkFlag: false,
      ifPass: true,
      checkList: [],
      checkReason: '',
      code: '',
      price_name: '',
      create_user: '',
      create_user_id: '',
      client_name: '',
      contact_man: '',
      unit: '',
      exchange_rate: '',
      update_time: '',
      reason: '',
      status: '',
      total_price: '',
      set_num: '',
      set_desc: '',
      product_need: '',
      product_info: [],
      file_url: [],
      price_info: [],
      basic_info: [],
      check_time: '',
      check_user: '',
      priceContactArr: [{
        id: 2016
      }],
      activePriceId: '',
      transitionIndex: ''
    }
  },
  methods: {
    changePrice (e) {
      this.getPriceDetail(e.id)
    },
    checkPrice () {
      if (this.ifPass) {
        price.check({
          id: this.activePriceId
        }).then((res) => {
          if (res.data.status) {
            let title = '您有一条消息通知'
            if (this.ifMsg === 1 || (this.ifMsg === 2 && !this.ifPass) || (this.ifMsg === 4 && this.ifPass)) {
              notify.create({
                title: title,
                type: '普通',
                tag: '工序',
                content: '有一张报价单' + (this.ifPass ? '<span style="color:#01B48C">已审核通过</span>' : '<span style="color:#F5222D">已被驳回</span>'),
                router_url: '/price/priceDetail/' + this.$route.params.id,
                receive_user: [this.create_user_id]
              }).then((res) => {
                if (res.data.status) {
                  this.checkFlag = false
                  this.$message.success('审核成功')
                  this.$router.push('/price/priceDetail/' + this.$route.params.id)
                }
              })
            } else {
              this.checkFlag = false
              this.$message.success('审核成功')
              this.$router.push('/price/priceDetail/' + this.$route.params.id)
            }
            this.getPriceDetail(this.activePriceId)
          }
        })
      } else {
        price.check({
          id: this.activePriceId,
          reason: JSON.stringify(this.checkList),
          reason_text: this.checkReason
        }).then((res) => {
          if (res.data.status) {
            let title = '您有一条消息通知'
            if (this.ifMsg === 1 || (this.ifMsg === 2 && !this.ifPass) || (this.ifMsg === 4 && this.ifPass)) {
              notify.create({
                title: title,
                type: '普通',
                tag: '工序',
                content: '有一张报价单' + this.ifPass ? '<span style="color:#01B48C">已审核通过</span>' : '<span style="color:#F5222D">已被驳回</span>',
                router_url: '/price/priceDetail/' + this.$route.params.id,
                receive_user: [this.create_user_id]
              }).then((res) => {
                if (res.data.status) {
                  this.checkFlag = false
                  this.$message.success('审核成功')
                  this.$router.push('/price/priceDetail/' + this.$route.params.id)
                }
              })
            } else {
              this.checkFlag = false
              this.$message.success('审核成功')
              this.$router.push('/price/priceDetail/' + this.$route.params.id)
            }
            this.getPriceDetail(this.activePriceId)
          }
        })
      }
    },
    getPriceDetail (id, flag) { // flag为是否重置priceContactArr这个数组
      this.loading = true
      this.activePriceId = id
      price.detail({
        id: id
      }).then(res => {
        if (res.data.status) {
          let data = res.data.data
          if (flag) {
            this.priceContactArr = data.child_data.map((itemP, indexP) => {
              return {
                name: itemP.name || itemP.quotation_code || itemP.id,
                pid: itemP.pid,
                quotation_code: itemP.quotation_code,
                id: itemP.id
              }
            }).sort((a, b) => {
              return a.id - b.id
            })
            this.priceContactArr.unshift({
              name: data.name || data.quotation_code || data.id,
              id: data.id,
              pid: data.pid,
              quotation_code: data.quotation_code
            })
            if (this.$route.query.priceId !== this.$route.params.id && this.$route.query.priceId) {
              this.transitionIndex = this.priceContactArr.findIndex(itemF => +itemF.id === +this.$route.query.priceId)
              this.getPriceDetail(this.$route.query.priceId)
              return
            }
          }
          this.code = data.quotation_code
          this.price_name = data.name
          this.check_time = data.check_time
          this.check_user = data.check_user
          this.create_user_id = data.user_id
          this.create_user = data.user_name
          this.client_name = data.client_name
          this.contact_man = data.contact_name
          this.unit = data.account_unit
          this.exchange_rate = data.exchange_rate
          this.update_time = data.updated_at
          this.reason = data.reason_text ? data.reason_text + ',' + (data.reason ? JSON.parse(data.reason).join(',') + (data.reason_text ? '(' + data.reason_text + ')' : '') : '') : (data.reason ? JSON.parse(data.reason).join(',') + (data.reason_text ? '(' + data.reason_text + ')' : '') : '')
          this.status = data.status
          this.total_price = data.total_price
          this.set_num = data.number
          this.set_desc = data.product_need_desc
          this.product_need = data.product_need
          this.product_info = data.product_info.map(item => {
            return {
              show: false,
              colorSize: item.color_size,
              product_id: item.product_info.product_id,
              product_type: item.product_info.product_type,
              product_code: item.product_info.product_code,
              img: item.product_info.image,
              category_name: item.product_info.category_name,
              type_name: item.product_info.type_name,
              style_name: item.product_info.style_name,
              color: item.product_info.color.map(vals => vals.color_name),
              size: item.product_info.size_measurement,
              description: item.product_info.description
              // ...item
            }
          })
          this.file_url = data.file_url || [require('@/assets/image/index/noPic.jpg')]
          data.material_process = data.material_process || JSON.stringify([])
          let priceInfo = [
            ...JSON.parse(data.material_info).map(item => {
              return {
                name: item.name ? item.name : '原料',
                number: item.weight,
                price: item.price,
                sunhao: item.prop || item.sunhao,
                totalPrice: item.total_price,
                unit: 'g'
              }
            }),
            ...JSON.parse(data.assist_info).map(item => {
              return {
                name: item.name ? item.name : '辅料',
                number: item.weight,
                price: item.price,
                sunhao: item.prop || item.sunhao,
                totalPrice: item.total_price,
                unit: item.unit
              }
            }),
            ...JSON.parse(data.material_process).map(item => {
              return {
                name: item.name && item.name.length !== 0 ? item.name.join('/') : '物料加工',
                totalPrice: item.total_price || item.price
              }
            }),
            ...JSON.parse(data.weave_info).map(item => {
              return {
                name: item.name ? item.name : '织造',
                other: item.number,
                totalPrice: item.total_price || item.price
              }
            }),
            ...JSON.parse(data.semi_product_info).map(item => {
              return {
                name: item.name && item.name.length !== 0 ? item.name.join('/') : '半成品加工',
                totalPrice: item.total_price || item.price
              }
            }),
            ...JSON.parse(data.production_info).map(item => {
              return {
                name: item.name && item.name.length !== 0 ? item.name.join('/') : '成品加工',
                totalPrice: item.total_price || item.price
              }
            }),
            ...JSON.parse(data.pack_material_info).map(item => {
              return {
                name: item.name ? item.name : '包装',
                totalPrice: item.total_price || item.price
              }
            }),
            ...JSON.parse(data.desc_info).map(item => {
              return {
                name: item.name ? item.name : '其他',
                totalPrice: item.total_price || item.price
              }
            }),
            { name: '非生产费用', totalPrice: data.no_product_cost },
            { name: '运输', totalPrice: data.transport_cost }
          ]
          let basicInfo = [{
            name: '基本佣金',
            prop: JSON.parse(data.commission).prop,
            totalPrice: JSON.parse(data.commission).price
          },
          {
            name: '基本税费',
            prop: JSON.parse(data.tax).prop,
            totalPrice: JSON.parse(data.tax).price
          },
          {
            name: '基本利润',
            prop: JSON.parse(data.profit).prop,
            totalPrice: JSON.parse(data.profit).price
          }]
          this.price_info = priceInfo
          this.basic_info = basicInfo
        }
        this.loading = false
      })
    }
  },
  filters: {
    filterTotal (item) {
      if (item.length === 0) {
        return 0
      } else {
        return Number(item.map(item => +item.totalPrice || 0).reduce((total, val) => {
          return Number(total) + Number(val)
        })).toFixed(2)
      }
    },
    filterStatus (statu) {
      if (statu === 1) {
        return '待审核'
      } else if (statu === 2) {
        return '已通过'
      } else if (statu === 3) {
        return '驳回'
      }
    }
  },
  created () {
    this.getPriceDetail(this.$route.params.id, true)
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/less/price/priceDetail.less";
</style>
