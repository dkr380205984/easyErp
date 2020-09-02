<template>
  <div id='orderCreate'
    class='indexMain'
    v-loading='loading'>
    <div class="module">
      <div class="titleCtn"
        style="display: flex;justify-content: space-between;align-items: center;">
        <span class="title">
          基本信息
          <zh-message :msgSwitch="msgSwitch"
            :url="msgUrl"
            :content="msgContent"></zh-message>
        </span>
        <el-autocomplete style="width:200px;height:32px"
          v-model="importKeyword"
          :fetch-suggestions="querySearchOrder"
          placeholder="导入产品订单"
          :trigger-on-focus="false"
          @select="importOrder"></el-autocomplete>
      </div>
      <div class="editCtn hasBorderTop">
        <div class="rowCtn">
          <div class="colCtn flex3"
            v-for="(item,index) in order_code"
            :key="index">
            <span class="label">
              <template v-if="index === 0">
                <span class="text">订单号</span>
                <span class="explanation">(必填)</span>
              </template>
            </span>
            <span class="content">
              <zh-input placeholder="请输入订单号"
                v-model="item.code">
              </zh-input>
              <div class="editBtn deleteBtn"
                v-show="index !== order_code.length - 1"
                @click="deleteItem(order_code,index)">删除
              </div>
              <div class="editBtn addBtn"
                v-show="index === order_code.length - 1"
                @click="addItem(order_code,'code')">添加
              </div>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">订单公司</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <el-select v-model="client_id"
                filterable
                placeholder="请选择订单公司"
                :filter-method="searchClient"
                @change="getContact($event)">
                <el-option v-for="item in clientArrReal"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">下单日期</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <el-date-picker v-model="order_time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择下单日期">
              </el-date-picker>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">结算单位</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <el-select v-model="unit"
                placeholder="请选择结算单位"
                @change="getUnit">
                <el-option v-for="item in unitArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">汇率
                <el-tooltip class="item"
                  effect="dark"
                  content="点击查看实时汇率"
                  placement="top-start">
                  <em class="el-icon-question"
                    @click="$openUrl('http://forex.hexun.com/rmbhl/#zkRate')"></em>
                </el-tooltip>
              </span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入汇率"
                v-model="exchange_rate"
                type="number"
                errorPosition='bottom'
                errorMsg="请输入数字">
              </zh-input>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn rightBtn">
        <span class="title">产品信息</span>
        <!-- <span class="rightCtn"> -->
        <div class="btn btnBlue"
          @click="addProductFlag = true">添加产品</div>
        <!-- </span> -->
      </div>
      <div class="listCtn hasBorderTop">
        <div class="collapse"
          v-for="(itemPro,indexPro) in productList"
          :key="indexPro">
          <div class="collapse_title"
            @click="itemPro.active = !itemPro.active">
            <span class="collapse_icon el-icon-arrow-down"></span>
            <span class="collapse_title_info">
              <span class="title_info_top">款号：{{itemPro.code}}</span>
              <span class="title_info_bottom">产品名称：{{itemPro.name}}</span>
            </span>
            <span class="collapse_right_cont">
              <div class="btn noBorder"
                @click.stop="itemPro.isChange = true,changeData = itemPro,addProductFlag = true">修改</div>
              <div class="btn noBorder"
                style="margin-left:0"
                @click.stop="productList.push($clone(itemPro))">复制</div>
              <div class="btn noBorder"
                style="margin-left:0"
                @click.stop="deleteItem(productList,indexPro)">删除</div>
            </span>
          </div>
          <el-collapse-transition>
            <div class="collapse_inner"
              v-show="itemPro.active">
              <div class="rowCtn">
                <span class="label">产品款号</span>：
                <span class="info strong">{{itemPro.code}}</span>
              </div>
              <div class="rowCtn">
                <span class="label">产品名称</span>：
                <span class="info">{{itemPro.name}}</span>
              </div>
              <div class="rowCtn">
                <span class="label">其它信息</span>：
                <span class="info">{{!itemPro.other_info ? `
                  产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息
                  产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息
                  产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息
                  产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息产品其它信息` : itemPro.other_info}}
                </span>
              </div>
              <div class="rowCtn">
                <span class="label">产品配色</span>：
                <span class="info">
                  <span class="colorInfo"
                    v-for="(itemColor,indexColor) in itemPro.colors"
                    :key="indexColor">{{Math.round(indexColor+1)+'.'+itemColor.name}}</span>
                </span>
              </div>
              <div class="rowCtn">
                <span class="label">尺码信息</span>：
                <span class="info">
                  <span class="sizeInfo"
                    v-for="(itemSize,indexSize) in itemPro.sizes"
                    :key="indexSize">
                    <span class="item">{{itemSize.name}}</span>
                    <span class="item">{{itemSize.size_info ? itemSize.size_info + 'cm' : '/'}}</span>
                    <span class="item">{{itemSize.weight ? itemSize.weight + 'g' : '/'}}</span>
                  </span>
                </span>
              </div>
              <div class="rowCtn">
                <span class="label">附件</span>：
                <span class="info">
                  <div class="imageInfo"
                    v-for="(itemImg,indexImg) in itemPro.file_arr"
                    :key="indexImg">
                    <el-image class="item"
                      :src="itemImg"
                      :preview-src-list="itemPro.file_arr">
                    </el-image>
                  </div>
                </span>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">订单批次信息</span>
      </div>
      <div class="listCtn hasBorderTop">
        <div class="tableCtnLv2 dashedBorder">
          <div class="tb_header">
            <span class="tb_row flex06">批次名称</span>
            <span class="tb_row middle">交货日期</span>
            <span class="tb_row tb_col flex5">
              <span class="tb_col_item">
                <span class="tb_row">产品信息</span>
                <span class="tb_row">尺码颜色</span>
                <span class="tb_row flex06 right">数量</span>
                <span class="tb_row flex06 right">单价</span>
                <span class="tb_row flex06 right">总价</span>
                <span class="tb_row middle">操作</span>
              </span>
            </span>
          </div>
          <div class="tb_content"
            v-for="(itemBatch,indexBatch) in batchInfo"
            :key="indexBatch">
            <span class="tb_row flex06">
              <zh-input placeholder='名称'
                v-model="itemBatch.name"
                class="inner_input" />
            </span>
            <span class="tb_row middle">
              <el-date-picker value-format='yyyy-MM-dd'
                v-model="itemBatch.time"
                class="inner_input"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </span>
            <span class="tb_row tb_col flex5">
              <span class="tb_col_item"
                v-for="(itemPro,indexPro) in itemBatch.product_info"
                :key="indexPro">
                <span class="tb_row">
                  <el-select placeholder="选择产品"
                    v-model="itemPro.product_id"
                    class="inner_input"
                    @change="selectPro($event,itemPro)">
                    <el-option v-for="(item,index) in productList"
                      :key="index"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </span>
                <span class="tb_row">
                  <el-cascader :options="itemPro.sizeColorArr"
                    v-model="itemPro.size_color"
                    class="inner_input"
                    :props="{ expandTrigger: 'hover' }"></el-cascader>
                </span>
                <span class="tb_row flex06 right">
                  <zh-input placeholder='数量'
                    v-model="itemPro.number"
                    type='number'
                    class="inner_input"
                    @input="computedTotalPrice(itemPro)" />
                </span>
                <span class="tb_row flex06 right">
                  <zh-input placeholder='单价'
                    v-model="itemPro.price"
                    type='number'
                    class="inner_input"
                    @input="computedTotalPrice(itemPro)" />
                </span>
                <span class="tb_row flex06 right">
                  <zh-input placeholder='总价'
                    v-model="itemPro.total_price"
                    type='number'
                    class="inner_input" />
                </span>
                <span class="tb_row middle">
                  <span class="tb_handle_btn blue"
                    @click="addItem(itemBatch.product_info,'product_batch')">添加</span>
                  <span class="tb_handle_btn red"
                    @click="itemBatch.product_info.length === 1 ? batchInfo.splice(indexBatch,1) :deleteItem(itemBatch.product_info,indexPro)">删除</span>
                </span>
              </span>
            </span>
          </div>
        </div>
        <div class="addRows">
          <span class="once"
            @click="addItem(batchInfo,'batch')">添加批次</span>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">其他信息</span>
      </div>
      <div class="editCtn hasBorderTop">
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">
              <span class="text">订单合同</span>
            </span>
            <span class="content autoHeight">
              <el-upload class="upload"
                multiple
                action="https://upload.qiniup.com/"
                :before-upload="beforeAvatarUpload"
                :data="postData"
                ref="orderUpload"
                :file-list="order_file_arr"
                list-type="picture">
                <div class="uploadBtn">
                  <i class="el-icon-upload"></i>
                  <span>上传文件</span>
                </div>
                <div slot="tip"
                  class="el-upload__tip">上传的文件不可超过10M</div>
              </el-upload>
            </span>
          </div>
          <div class="colCtn">
            <span class="label">
              <span class="text">包装资料</span>
            </span>
            <span class="content autoHeight">
              <el-upload class="upload"
                action="https://upload.qiniup.com/"
                multiple
                :before-upload="beforeAvatarUpload"
                :data="postData"
                ref="packagUpload"
                :file-list="packag_file_arr"
                list-type="picture">
                <div class="uploadBtn">
                  <i class="el-icon-upload"></i>
                  <span>上传文件</span>
                </div>
                <div slot="tip"
                  class="el-upload__tip">上传的文件不可超过10M</div>
              </el-upload>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">
              <span class="text">装箱资料</span>
            </span>
            <span class="content autoHeight">
              <el-upload class="upload"
                action="https://upload.qiniup.com/"
                multiple
                :before-upload="beforeAvatarUpload"
                :data="postData"
                ref="boxUpload"
                :file-list="box_file_arr"
                list-type="picture">
                <div class="uploadBtn">
                  <i class="el-icon-upload"></i>
                  <span>上传文件</span>
                </div>
                <div slot="tip"
                  class="el-upload__tip">上传的文件不可超过10M</div>
              </el-upload>
            </span>
          </div>
          <div class="colCtn">
            <span class="label">
              <span class="text">其他文件</span>
            </span>
            <span class="content autoHeight">
              <el-upload class="upload"
                action="https://upload.qiniup.com/"
                multiple
                :before-upload="beforeAvatarUpload"
                :data="postData"
                ref="otherUpload"
                :file-list="other_file_arr"
                list-type="picture">
                <div class="uploadBtn">
                  <i class="el-icon-upload"></i>
                  <span>上传文件</span>
                </div>
                <div slot="tip"
                  class="el-upload__tip">上传的文件不可超过10M</div>
              </el-upload>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">
              <span class="taxt">备注信息</span>
            </span>
            <span class="content">
              <el-input type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="remark"
                placeholder="请输入备注信息"></el-input>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray"
            @click="$router.go(-1)">返回</div>
          <div class="btn btnBlue"
            @click="saveAll">添加</div>
        </div>
      </div>
    </div>
    <el-drawer :visible.sync="addProductFlag"
      :wrapperClosable="false"
      :with-header="false"
      :destroy-on-close='true'
      ref="productDrawer">
      <addProduct @commit='addProduct'
        v-if="addProductFlag"
        @close="closeProduct"
        :datas='changeData' />
    </el-drawer>
  </div>
</template>

<script>
import { moneyArr } from '@/assets/js/dictionary.js'
import { client, group, order, getToken, orderType } from '@/assets/js/api.js'
import addProduct from '@/components/drawerComs/orderCreate/addProduct/addProduct.vue'
export default {
  data () {
    return {
      addProductFlag: false,
      loading: true,
      msgSwitch: false,
      msgUrl: '',
      msgContent: '',
      order_code: [{ code: '' }],
      client_id: '',
      clientArr: [],
      clientArrReal: [],
      unit: '元',
      unitArr: moneyArr,
      exchange_rate: 100,
      order_time: this.$getTime(),
      batchInfo: [],
      postData: { token: '' },
      remark: '',
      isResouceShow: 0, // 处理cascader报错问题 绑定key值用来当option改变时重新渲染cascader
      order_file_arr: [],
      packag_file_arr: [],
      box_file_arr: [],
      other_file_arr: [],
      importKeyword: '',
      productList: [],
      changeData: null
    }
  },
  methods: {
    addProduct (data) {
      if (data.isChange) {
        let index = this.productList.findIndex(itemF => itemF.isChange)
        this.productList[index].code = data.code
        this.productList[index].name = data.name
        this.productList[index].other_info = data.other_info
        this.productList[index].colors = data.colors
        this.productList[index].sizes = data.sizes
        this.productList[index].file_arr = data.file_arr
        this.productList[index].isChange = false
        this.changeData = null
      } else {
        this.productList.push({
          active: false,
          code: data.code,
          name: data.name,
          other_info: data.other_info,
          colors: data.colors,
          sizes: data.sizes,
          file_arr: data.file_arr
        })
      }
      this.$forceUpdate()
    },
    closeProduct () {
      this.addProductFlag = false
    },
    searchClient (query) {
      this.clientArrReal = []
      if (query) {
        // 判断一个字符串是否包含某几个字符,所有的indexOf!==-1 且字符是从左往右的,也就是从小到大的
        if (new RegExp('[\u4E00-\u9FA5]+').test(query.substr(0, 1))) {
          this.clientArrReal = this.clientArr.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        } else {
          const queryArr = query.split('')
          this.clientArr.forEach((item) => {
            let flag = true
            let indexPinyin = 0
            queryArr.forEach((itemQuery) => {
              indexPinyin = item.name_pinyin.substr(indexPinyin, item.name_pinyin.length).indexOf(itemQuery)
              if (indexPinyin === -1) {
                flag = false
                // 可以通过throw new Error('')终止循环,如果需要优化的话
              }
            })
            if (flag) {
              this.clientArrReal.push(item)
            }
          })
        }
      } else {
        this.clientArrReal = this.$clone(this.clientArr)
      }
    },
    // 批次类型输入建议函数
    querySearchType (queryString, cb) {
      let restaurants = this.orderTypeArr
      let results = queryString ? restaurants.filter(itemF => itemF.value.indexOf(queryString) !== -1) : restaurants
      cb(results)
    },
    // 获取汇率
    getUnit (ev) {
      this.exchange_rate = moneyArr.find((item) => item.name === ev).default
      this.tax_prop = moneyArr.find((item) => item.name === ev).tax_prop
    },
    querySearchOrder (querystring, cb) {
      order.list({
        page: 1,
        limit: 9999,
        keyword: querystring
      }).then(res => {
        if (res.data.status !== false) {
          cb(res.data.data.map(item => {
            return {
              value: item.order_code,
              id: item.id
            }
          }))
        }
      })
    },
    addItem (item, type) {
      if (type === 'code') {
        item.push({ code: '' })
      } else if (type === 'batch') {
        item.push({
          name: '',
          time: '',
          product_info: [{
            product_id: '',
            size_color: '',
            sizeColorArr: [],
            number: '',
            price: '',
            total_price: ''
          }]
        })
      } else if (type === 'product_batch') {
        item.push({
          product_id: '',
          size_color: '',
          sizeColorArr: [],
          number: '',
          price: '',
          total_price: ''
        })
      } else if (type === 'sizeColor') {
        item.push({
          size_color: '',
          price: '',
          number: ''
        })
      } else if (type === 'product') {
        item.push({
          active: false,
          name: '',
          type: '',
          otherInfo: '',
          color: [{ name: '' }],
          size: [{ name: '', size_info: '', weight: '' }]
        })
      } else if (type === 'color') {
        item.push({
          name: ''
        })
      } else if (type === 'size') {
        item.push({
          name: '',
          size_info: '',
          weight: ''
        })
      }
    },
    deleteItem (item, index) {
      if (item.length === 1) {
        this.$message.warning('至少存在一项')
        return
      }
      item.splice(index, 1)
      this.isResouceShow++
    },
    beforeAvatarUpload (file) {
      this.postData.key = file.name
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('文件大小不能超过 10MB!')
        return false
      }
    },
    saveAll () {
      if (!this.lock) {
        this.$message.warning('请勿频繁点击')
        return
      }
      let flag = true
      this.order_code.forEach(item => {
        if (!item.code) {
          flag = false
        }
      })
      if (!flag) {
        this.$message.error('请填写订单号')
        return
      }
      if (!this.client_id) {
        this.$message.error('请选择外贸公司')
        return
      }
      if (!this.group_id) {
        this.$message.error('请选择负责小组')
        return
      }
      if (!this.unit) {
        this.$message.error('请选择结算单位')
        return
      }
      if (Number(this.tax_prop) !== 0 && !this.tax_prop) {
        this.$message.error('请输入税率')
        return
      }
      if (!this.order_time) {
        this.$message.error('请选择下单日期')
        return
      }
      let timeFlag = true // 是否选择了交货时间的flag
      if (this.batchDate.length < 1) {
        this.$message.error('检测到没有批次数据，请添加')
        return
      }
      this.batchDate.forEach(item => {
        if (!item.time) {
          timeFlag = false
        }
        if (item.batch_info.length < 1) {
          this.$message.error('检测到批次内没有产品信息，请添加')
          flag = false
        }
        item.batch_info.forEach(itemBtach => {
          if (!itemBtach.id) {
            flag = false
          }
          if (itemBtach.product_info.length < 1) {
            this.$message.error('检测到产品内没有尺码颜色信息，请添加')
            flag = false
          }
          itemBtach.product_info.forEach(itemPro => {
            if (itemPro.size_color.length === 0 || !itemPro.price || !itemPro.number) {
              flag = false
            }
          })
        })
      })
      if (!timeFlag) {
        this.$message.error('请选择交货日期')
        return
      }
      if (!flag) {
        this.$message.error('检测到批次信息内有还未填写项，请检查批次内是否填写完成')
        return
      }
      if (!this.total_price) {
        this.$message.error('请输入总价')
        return
      }
      const orderContract = this.$refs.orderUpload.uploadFiles.map((item) => { return (!item.response ? item.url : ('https://zhihui.tlkrzf.com/' + item.response.key)) })
      const packMeans = this.$refs.packagUpload.uploadFiles.map((item) => { return (!item.response ? item.url : ('https://zhihui.tlkrzf.com/' + item.response.key)) })
      const storeMeans = this.$refs.boxUpload.uploadFiles.map((item) => { return (!item.response ? item.url : ('https://zhihui.tlkrzf.com/' + item.response.key)) })
      const otherInfo = this.$refs.otherUpload.uploadFiles.map((item) => { return (!item.response ? item.url : ('https://zhihui.tlkrzf.com/' + item.response.key)) })
      let materialPlanFlag = this.timeData.find(item => item.name === '物料计划')
      let productPackFlag = this.timeData.find(item => item.name === '成品装箱')
      let productPushFlag = this.timeData.find(item => item.name === '成品入库')
      let semiProductPushFlag = this.timeData.find(item => item.name === '半成品入库')
      let materialPushFlag = this.timeData.find(item => item.name === '物料入库')
      let warnData = this.isOpenWarn ? {
        order_time: this.order_time,
        end_time: this.getWarnEndTime(),
        progress_data: {
          material_plan: this.$toFixed(materialPlanFlag.percent * 100),
          material_push: this.$toFixed(materialPushFlag.percent * 100),
          semi_product_push: this.$toFixed(semiProductPushFlag.percent * 100),
          product_push: this.$toFixed(productPushFlag.percent * 100),
          product_pack: this.$toFixed(productPackFlag.percent * 100)
        }
      } : null
      let data = {
        order_code: this.order_code.map(item => {
          return item.code
        }).join(';'),
        client_id: this.client_id,
        contacts: this.contact_id,
        account_unit: this.unit,
        group_id: this.group_id,
        exchange_rate: this.exchange_rate || moneyArr.find((item) => item.name === this.unit).default,
        tax_rate: this.tax_prop,
        order_time: this.order_time,
        order_info: this.batchDate.map((item, index) => {
          return {
            batch_info: item.batch_info.map(itemPro => {
              return {
                product_id: itemPro.id,
                product_info: itemPro.product_info.map(itemSize => {
                  return {
                    size_id: itemSize.size_color[0],
                    color_id: itemSize.size_color[1],
                    numbers: itemSize.number,
                    unit_price: itemSize.price
                  }
                })
              }
            }),
            delivery_time: item.time,
            batch_id: parseInt(index + 1),
            batch_title: item.name,
            order_type: item.type,
            desc: item.remark
          }
        }),
        total_price: this.total_price,
        remark: this.remark,
        total_price_RMB: this.total_price * this.exchange_rate / 100,
        order_contract: JSON.stringify(orderContract),
        pack_means: JSON.stringify(packMeans),
        store_means: JSON.stringify(storeMeans),
        others_info: JSON.stringify(otherInfo),
        time_progress: warnData
      }
      this.lock = false
      order.create(data).then(res => {
        if (res.data.status) {
          this.$message.success('添加成功')
          if (window.localStorage.getItem(this.$route.name) && JSON.parse(window.localStorage.getItem(this.$route.name)).msgFlag) {
            this.msgUrl = '/order/orderDetail/' + res.data.data.id
            this.msgContent = '<span style="color:#E6A23C">添加</span>了一个订单<span style="color:#1A95FF">' + res.data.data.order_code + '</span>'
            this.msgSwitch = true
          } else {
            this.$router.push('/order/orderDetail/' + res.data.data.id)
          }
        }
      })
    },
    importOrder (event) {
      this.loading = true
      order.editDetail({
        id: event.id
      }).then(res => {
        if (res.data.status === false) {
          return
        }
        // 初始化修改订单数据
        let orderInfo = res.data.data
        this.order_code = orderInfo.order_code.split(';').map(item => {
          return {
            code: item
          }
        })
        this.client_id = orderInfo.client_id.toString()
        this.getContact(this.client_id)
        this.contact_id = orderInfo.contacts_id
        this.group_id = orderInfo.group_id
        this.unit = orderInfo.account_unit
        this.exchange_rate = orderInfo.exchange_rate
        this.tax_prop = orderInfo.tax_rate
        this.order_time = orderInfo.order_time
        let orderBatch = []
        let arr = [] // 存储产品id
        orderInfo.order_batch.forEach(itemBatch => {
          let productInfo = this.$mergeData(this.$clone(itemBatch.product_info).map(items => {
            items.id = items.product_id.toString()
            items.unit = items.category_info.unit
            items.sizeColor = items.all_size.map(valSize => {
              return {
                value: valSize.size_id,
                label: valSize.size_name,
                children: items.all_color.map(valColor => {
                  return {
                    value: valColor.color_id,
                    label: valColor.color_name
                  }
                })
              }
            })
            delete items.product_info
            delete items.image
            return items
          }), { mainRule: 'id', otherRule: [{ name: 'unit' }, { name: 'sizeColor' }], childrenName: 'product_info', childrenRule: { mainRule: ['size_id', 'color_id', 'unit_price/price'], otherRule: [{ name: 'numbers/number', type: 'add' }, { name: 'size_name/color' }, { name: 'color_name/color' }] } })
          orderBatch.push({
            time: itemBatch.delivery_time,
            remark: itemBatch.desc,
            name: itemBatch.batch_title,
            type: itemBatch.order_type,
            batch_info: productInfo
          })
          itemBatch.product_info.forEach(itemPro => {
            let flag = arr.find(itemId => itemId.id === itemPro.product_id.toString())
            if (!flag) {
              arr.push({
                category_info: {
                  name: itemPro.category_info.unit,
                  product_category: itemPro.category_info.category_name
                },
                checked: true,
                color: itemPro.all_color,
                flower_id: itemPro.category_info.flower_name,
                id: itemPro.product_id.toString(),
                product_code: itemPro.product_code,
                sizeColor: itemPro.all_size.map(valSize => {
                  return {
                    value: valSize.size_id,
                    label: valSize.size_name,
                    children: itemPro.all_color.map(valColor => {
                      return {
                        value: valColor.color_id,
                        label: valColor.color_name
                      }
                    })
                  }
                }),
                size: itemPro.all_size
              })
            }
          })
        })
        this.checkedProList = arr
        this.batchDate = orderBatch.map(itemBatch => {
          return {
            time: itemBatch.time,
            batch_info: itemBatch.batch_info.map(itemPro => {
              return {
                id: itemPro.id,
                product_info: itemPro.product_info.map(itemSize => {
                  return {
                    size_color: [itemSize.size_id, itemSize.color_id],
                    number: itemSize.number,
                    price: ''
                  }
                }),
                sizeColor: itemPro.sizeColor,
                unit: itemPro.unit
              }
            }),
            name: itemBatch.name,
            remark: itemBatch.remark,
            type: itemBatch.type
          }
        })
        this.order_file_arr = orderInfo.order_contract ? JSON.parse(orderInfo.order_contract).map(items => {
          return {
            name: items.replace('https://zhihui.tlkrzf.com/', ''),
            url: items
          }
        }) : []
        this.packag_file_arr = orderInfo.pack_means ? JSON.parse(orderInfo.pack_means).map(items => {
          return {
            name: items.replace('https://zhihui.tlkrzf.com/', ''),
            url: items
          }
        }) : []
        this.box_file_arr = orderInfo.store_means ? JSON.parse(orderInfo.store_means).map(items => {
          return {
            name: items.replace('https://zhihui.tlkrzf.com/', ''),
            url: items
          }
        }) : []
        this.other_file_arr = orderInfo.others_info ? JSON.parse(orderInfo.others_info).map(items => {
          return {
            name: items.replace('https://zhihui.tlkrzf.com/', ''),
            url: items
          }
        }) : []
        this.computedTotalPrice()
        this.remark = orderInfo.remark
        this.loading = false
      })
    }
  },
  created () {
    Promise.all([
      client.list(),
      group.list(),
      getToken(),
      orderType.typeList({
        order_type: 1
      })
    ]).then(res => {
      this.loading = true
      this.clientArr = res[0].data.data.filter(item => item.type.indexOf(1) !== -1)
      this.clientArr.forEach((item) => {
        item.name_pinyin = item.name_pinyin.join('')
      })
      this.clientArrReal = this.$clone(this.clientArr)
      this.groupArr = res[1].data.data
      this.postData.token = res[2].data.data
      this.orderTypeArr = res[3].data.data.map(item => {
        return {
          value: item.name
        }
      })
      this.loading = false
    })
  },
  filters: {
    filterType (item) {
      return [item.category_info.product_category, item.type_name, item.style_name].join('/')
    }
  },
  watch: {
    unit (newVal) {
      if (newVal === '元') {
        this.exchange_rate = 100
      }
    }
  },
  components: {
    addProduct
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/less/order/orderCreate.less";
</style>
<style lang="less">
#orderCreate {
  .editCtn {
    //  日期选择器样式修改
    .el-date-editor {
      width: 100% !important;
      height: 100% !important;
      line-height: 32px !important;
    }
  }
  .el-input__inner {
    height: 32px !important;
  }
  .oprText {
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    position: absolute;
    top: 40px;
    left: 4px;
    cursor: pointer;
    &:hover {
      color: #1a95ff;
    }
  }
  // el抽屉组件宽度及内部高度样式修改
  .el-drawer__body {
    height: 100%;
  }
  .el-drawer {
    min-width: 520px !important;
  }
}
</style>
