<template>
  <div id="pricePrintTable"
    class="printHtml">
    <div class="printTable">
      <div class="print_head">
        <div class="left">
          <span class="title">{{company_name + '产品报价单'}}</span>
          <span class="item">
            <span class="label">创建人：</span>
            {{create_user}}
          </span>
          <span class="item">
            <span class="label">创建日期：</span>
            {{$getTime()}}
          </span>
          <span class="item">
            <span class="label">报价单编号：</span>
            {{price_code}}
          </span>
        </div>
        <div class="right">
          <span class="text">扫一扫<br />查看电子文档</span>
          <span class="qrCode_box">
            <img :src="qrCodeUrl"
              alt="二维码">
          </span>
        </div>
      </div>
      <div class="print_body">
        <div class="print_row has_marginBottom">
          <span class="row_item w180 center">外贸公司</span>
          <span class="row_item left">{{client_name}}</span>
          <span class="row_item w180 center">联系人</span>
          <span class="row_item left flex08">{{linkMan}}</span>
        </div>
        <div class="print_row has_marginBottom">
          <span class="row_item w180 center">结算单位</span>
          <span class="row_item left">{{unit}}</span>
          <span class="row_item w180 center">汇率</span>
          <span class="row_item left flex08">{{exchange_rate}}</span>
        </div>
        <div class="print_row">
          <span class="row_item w180 center">产品信息</span>
          <span class="row_item col">
            <div class="print_row flex3 noBorder"
              v-if="flie_url.length > 0">
              <span class="row_item center">
                <zh-img-list :list='flie_url'></zh-img-list>
              </span>
            </div>
            <div v-for="(item,key) in product_info"
              :key="key"
              :class="['print_row', 'flex3',(flie_url.length === 0 && key === 0) ? 'noBorder' : '']">
              <span class="row_item noBorder left">{{item.product_info.product_code}}</span>
              <span class="row_item noBorder left">{{item.product_info|filterType}}</span>
              <span class="row_item noBorder left">
                <zh-img-list :list='item.product_info.image'></zh-img-list>
              </span>
            </div>
          </span>
        </div>
        <div class="print_row has_marginBottom">
          <span class="row_item w180 center">产品需求</span>
          <span class="row_item left flex08">{{product_need}}</span>
        </div>
        <div class="print_row bgGray">
          <span class="row_item center w180">名称</span>
          <span class="row_item center">克重/数量</span>
          <span class="row_item center">单价</span>
          <span class="row_item center">损耗</span>
          <span class="row_item center">其他</span>
          <span class="row_item center">总价</span>
        </div>
        <div v-for="(item,key) in info"
          :key="key"
          :class="{'print_row':true,'has_marginBottom':key === info.length -1}">
          <span class="row_item center w180">{{item.name}}</span>
          <span class="row_item center">{{item.number ? item.number : '-'}}{{(item.unit && item.number ? item.unit : '')}}</span>
          <span class="row_item center">{{item.price ? item.price : '-'}}{{(item.unit&&item.price) ? '元/' + item.unit : ''}}</span>
          <span class="row_item center">{{item.sunhao ? item.sunhao + '%' : '-'}}</span>
          <span class="row_item center">{{item.other ? item.other + (item.name === '针织织造' ? '针' : '梭') : '-'}}</span>
          <span class="row_item center">{{item.totalPrice ? item.totalPrice : 0}}元</span>
        </div>
        <div class="print_row">
          <span class="row_item w180 center">基本佣金</span>
          <span class="row_item center">-</span>
          <span class="row_item center">-</span>
          <span class="row_item center">-</span>
          <span class="row_item center">{{yongjin.prop ? yongjin.prop : 0}}%</span>
          <span class="row_item center">{{yongjin.price ? yongjin.price : 0}}元</span>
        </div>
        <div class="print_row">
          <span class="row_item w180 center">基本税费</span>
          <span class="row_item center">-</span>
          <span class="row_item center">-</span>
          <span class="row_item center">-</span>
          <span class="row_item center">{{shuifei.prop ? shuifei.prop : 0}}%</span>
          <span class="row_item center">{{shuifei.price ? shuifei.price : 0}}元</span>
        </div>
        <div class="print_row">
          <span class="row_item w180 center">基本利润</span>
          <span class="row_item center">-</span>
          <span class="row_item center">-</span>
          <span class="row_item center">-</span>
          <span class="row_item center">{{lirun.prop ? lirun.prop : 0}}%</span>
          <span class="row_item center">{{lirun.price ? lirun.price : 0}}元</span>
        </div>
      </div>
      <div class="print_remark">
        <div class="print_row noBorder">
          <div class="row_item center w180">总价</div>
          <div class="row_item center noBorder"></div>
          <div class="row_item center noBorder"></div>
          <div class="row_item center noBorder"></div>
          <div class="row_item center noBorder">{{(unit && unit !== '元') ? $toFixed(Number(total_price / exchange_rate * 100)) + unit : ''}}</div>
          <div class="row_item center noBorder">{{total_price || 0}}元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { price } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      company_name: window.sessionStorage.getItem('company_name'),
      price_code: '',
      create_time: '',
      create_user: '',
      total_price: '',
      client_name: '',
      linkMan: '',
      qrCodeUrl: '',
      unit: '',
      product_need: '',
      exchange_rate: '',
      product_info: [],
      info: [],
      yongjin: {
        prop: '',
        price: ''
      },
      shuifei: {
        prop: '',
        price: ''
      },
      lirun: {
        prop: '',
        price: ''
      },
      flie_url: []
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    },
    filterType (item) {
      return item.category_name + '/' + item.type_name + '/' + item.style_name
    }
  },
  methods: {
    goTop () {
      document.body.scrollTop = 0
    }
  },
  created () {
    this.loading = false
    let date = new Date()
    this.create_time = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
    price.detail({
      id: this.$route.params.id
    }).then(res => {
      let data = res.data.data
      this.flie_url = data.file_url.map(item => {
        return {
          image_url: item,
          thumb: item
        }
      })
      this.price_code = data.quotation_code
      this.create_user = data.user_name
      this.client_name = data.client_name
      this.total_price = Number(data.total_price).toFixed(2)
      this.linkMan = data.contact_name
      this.unit = data.account_unit
      this.exchange_rate = data.exchange_rate
      this.product_need = data.product_need
      this.product_info = data.product_info
      this.yongjin = JSON.parse(data.commission)
      this.shuifei = JSON.parse(data.tax)
      this.lirun = JSON.parse(data.profit)
      this.info.push(
        ...JSON.parse(data.material_info).map(item => {
          return {
            name: item.name ? item.name : '原料',
            number: item.weight / 1000,
            price: item.price,
            sunhao: item.prop || item.sunhao,
            totalPrice: item.total_price,
            unit: 'kg'
          }
        }),
        ...JSON.parse(data.assist_info).map(item => {
          return {
            name: item.name ? item.name : '辅料',
            number: item.weight,
            price: item.price,
            sunhao: item.prop || item.sunhao,
            totalPrice: item.total_price,
            unit: item.unit || '件'
          }
        }),
        ...JSON.parse(data.weave_info).map(item => {
          return {
            name: item.name ? item.name : '织造',
            other: item.number,
            totalPrice: item.total_price
          }
        }),
        ...JSON.parse(data.semi_product_info).map(item => {
          return {
            name: item.name && item.name.length !== 0 ? item.name.join('/') : '半成品加工',
            totalPrice: item.total_price
          }
        }),
        ...JSON.parse(data.production_info).map(item => {
          return {
            name: item.name && item.name.length !== 0 ? item.name.join('/') : '成品加工',
            totalPrice: item.total_price
          }
        }),
        ...JSON.parse(data.pack_material_info).map(item => {
          return {
            name: item.name ? item.name : '包装',
            totalPrice: item.total_price
          }
        }),
        // ...JSON.parse(data.user_info).map(item => {
        //   return {
        //     name: item.name ? item.name : '非生产费用',
        //     totalPrice: item.price
        //   }
        // }),
        ...JSON.parse(data.desc_info).map(item => {
          return {
            name: item.name ? item.name : '其他',
            totalPrice: item.total_price
          }
        }),
        { name: '非生产费用', totalPrice: data.no_product_cost },
        { name: '运输', totalPrice: data.transport_cost }
      )
      setTimeout(() => {
        window.print()
      }, 1000)
    })
  },
  mounted () {
    const QRCode = require('qrcode')
    this.urlVal = window.location.origin + '/price/priceDetail/' + this.$route.params.id
    // 画二维码里的logo[注意添加logo图片的时候需要使用服务器]
    QRCode.toDataURL(this.urlVal, { errorCorrectionLevel: 'H' }, (err, url) => {
      console.log(err)
      this.qrCodeUrl = url
    })
  }
}
</script>

<style scoped lang="less">
@import "~@/assets/less/price/pricePrintTable.less";
</style>
<style lang="less">
html,
body {
  overflow: visible !important;
}
</style>
