<template>
  <div id='orderList'
    class='indexMain'
    v-loading='loading'>
    <div class="listCutCtn">
      <div class="cut_item active">
        <span class="icon order"></span>
        <span class="name">订单列表</span>
      </div>
      <div class="cut_item"
        @click="$router.push('/product/productList/page=1&&keyword=&&date=&&category_id=&&type_id=&&style_id=&&flower_id=&&user_id=&&has_plan=&&has_craft=&&has_quotation=')">
        <span class="icon product"></span>
        <span class="name">产品列表</span>
      </div>
    </div>
    <div class="chartsCtn">
      <div class="charts">
        <div class="title">
          <span>本月订单</span>
          <el-tooltip class="item"
            effect="dark"
            content="图表显示：当月订单需要完成的产品数量"
            placement="top">
            <i class="el-icon-info"
              style="float:right;line-height:42px;font-size:16px"></i>
          </el-tooltip>
        </div>
        <div class="number">{{monthAll}}</div>
        <v-chart style="width:320px;height:120px"
          :options="monthData" />
      </div>
      <div class="charts">
        <div class="title">
          <span>进行中订单</span>
          <el-tooltip class="item"
            effect="dark"
            content="图表显示：未来14天内，订单需要完成数量，且状态为进行中订单"
            placement="top">
            <i class="el-icon-info"
              style="float:right;line-height:42px;font-size:16px"></i>
          </el-tooltip>
        </div>
        <div class="number">{{processAll}}</div>
        <v-chart style="width:320px;height:120px"
          :options="processData" />
      </div>
      <div class="charts">
        <div class="title">
          <span>逾期订单</span>
          <el-tooltip class="item"
            effect="dark"
            content="图表显示：过去14天内，订单暂未完成的数量，且状态为逾期中的订单"
            placement="top">
            <i class="el-icon-info"
              style="float:right;line-height:42px;font-size:16px"></i>
          </el-tooltip>
        </div>
        <div class="number">{{delayAll}}</div>
        <v-chart style="width:320px;height:120px"
          :options="delayData" />
      </div>
      <div class="charts">
        <div class="title">
          <span>完成进度</span>
          <el-tooltip class="item"
            effect="dark"
            content="图表显示：当月订单完成率。完成率 = 当月订单装箱数量/当月订单需完成数量"
            placement="top">
            <i class="el-icon-info"
              style="float:right;line-height:42px;font-size:16px"></i>
          </el-tooltip>
        </div>
        <div class="number">{{$toFixed(completeAll)}}%</div>
        <v-chart style="width:320px;height:120px"
          :options="completeData" />
      </div>
    </div>
    <div class="module">
      <div class="listCtn">
        <div class="filterCtn2">
          <div class="leftCtn">
            <span class="label">筛选条件：</span>
            <div class="filter_line">
              <el-select style="width:140px;margin-right:12px"
                class="filter_item"
                v-model="searchOrderOrProduct"
                @change="changeRouter(1)">
                <el-option value="order"
                  label="订单搜索"></el-option>
                <el-option value="product"
                  label="产品编号搜索"></el-option>
              </el-select>
              <el-input class="filter_item"
                v-model="keyword"
                @change="changeRouter(1)"
                :placeholder="'输入' + (searchOrderOrProduct==='order'?'订单号':'产品编号')+'按回车键查询'">
              </el-input>
              <el-select v-model="company_id"
                class="filter_item"
                @change="changeRouter(1)"
                clearable
                filterable
                placeholder="筛选公司">
                <el-option v-for="(item,index) in companyArr"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="group_id"
                class="filter_item"
                @change="changeRouter(1)"
                clearable
                placeholder="筛选小组">
                <el-option v-for="(item,index) in groupArr"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <div class="resetBtn"
                @click="reset">重置</div>
            </div>
            <div class="filter_line"
              :class="!openHiddleFilter ? 'hiddle' : false">
              <el-date-picker v-model="date"
                style="width:290px"
                class="filter_item"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeRouter(1)">
              </el-date-picker>
              <el-select v-model="state"
                class="filter_item"
                @change="changeRouter(1)"
                clearable
                placeholder="筛选状态">
                <el-option v-for="(item,index) in stateArr"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-dropdown :hide-on-click="false"
                class="filter_item"
                trigger="click"
                style="cursor:pointer">
                <span class="el-dropdown-link">
                  筛选流程<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    物料计划：
                    <el-radio-group v-model="has_materialPlan"
                      @change="changeRouter(1)">
                      <el-radio label="">全部</el-radio>
                      <el-radio label="1">有</el-radio>
                      <el-radio label="2">无</el-radio>
                    </el-radio-group>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    物料订购：
                    <el-radio-group v-model="has_materialOrder"
                      @change="changeRouter(1)"
                      divided>
                      <el-radio label=''>全部</el-radio>
                      <el-radio label="1">有</el-radio>
                      <el-radio label="2">无</el-radio>
                    </el-radio-group>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    物料入库：
                    <el-radio-group v-model="has_materialStock"
                      @change="changeRouter(1)"
                      divided>
                      <el-radio label=''>全部</el-radio>
                      <el-radio label="1">有</el-radio>
                      <el-radio label="2">无</el-radio>
                    </el-radio-group>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    织造分配：
                    <el-radio-group v-model="has_weave"
                      @change="changeRouter(1)"
                      divided>
                      <el-radio label=''>全部</el-radio>
                      <el-radio label="1">有</el-radio>
                      <el-radio label="2">无</el-radio>
                    </el-radio-group>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    产品收发：
                    <el-radio-group v-model="has_productInOut"
                      @change="changeRouter(1)"
                      divided>
                      <el-radio label=''>全部</el-radio>
                      <el-radio label="1">有</el-radio>
                      <el-radio label="0">无</el-radio>
                    </el-radio-group>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    成品检验：
                    <el-radio-group v-model="has_inspection"
                      @change="changeRouter(1)"
                      divided>
                      <el-radio label=''>全部</el-radio>
                      <el-radio label="1">有</el-radio>
                      <el-radio label="2">无</el-radio>
                    </el-radio-group>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    装箱出库：
                    <el-radio-group v-model="has_boxing"
                      @change="changeRouter(1)"
                      divided>
                      <el-radio label=''>全部</el-radio>
                      <el-radio label="1">有</el-radio>
                      <el-radio label="2">无</el-radio>
                    </el-radio-group>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="rightCtn"
            @click="openHiddleFilter = !openHiddleFilter">
            {{openHiddleFilter ? '收起' : '展开'}}
            <span class="el-icon-arrow-down openIcon"
              :class="openHiddleFilter ? 'active' : false"></span>
          </div>
        </div>
        <div class="addCtn">
          <div class="btn btnBlue"
            @click="$router.push('/order/orderCreate')">新建订单</div>
        </div>
        <div class="list">
          <div class="title">
            <div class="col flex12">
              <span class="text">订单号</span>
            </div>
            <div class="col flex12">
              <span class="text">外贸公司</span>
            </div>
            <div class="col middle">
              <span class="text">产品图片</span>
            </div>
            <div class="col flex08">
              <span class="text">订单数量(件)</span>
            </div>
            <div class="col flex08">
              <span class="text">负责小组</span>
            </div>
            <div class="col flex16">
              <span class="text">流程进度</span>
            </div>
            <div class="col">
              <span class="text">订单状态</span>
            </div>
            <div class="col">
              <span class="text">下单时间</span>
            </div>
            <div class="col">
              <span class="text">操作</span>
            </div>
          </div>
          <div class="row"
            v-for="(itemOrder,indexOrder) in list"
            :key="indexOrder">
            <div class="col flex12">{{itemOrder.order_code}}</div>
            <div class="col flex12">{{itemOrder.client_name}}</div>
            <div class="col middle">
              <zh-img-list :list="itemOrder.image"
                type='open'></zh-img-list>
            </div>
            <div class="col flex08">
              {{itemOrder.number}}
            </div>
            <div class="col flex08">
              {{itemOrder.group_name}}
            </div>
            <div class="col flex16">
              <div class="stateCtn"
                :class="{'green':itemOrder.has_plan>0}">
                <div class="state"></div>
                <span class="name">计</span>
              </div>
              <div class="stateCtn"
                :class="{'orange':itemOrder.material_order_progress.y_percent>0,'green':itemOrder.material_order_progress.y_percent>=100}">
                <div class="state"></div>
                <span class="name">订</span>
              </div>
              <div class="stateCtn"
                :class="{'orange':itemOrder.material_push_progress.r_push>0,'green':itemOrder.material_push_progress.r_push>=100}">
                <div class="state"></div>
                <span class="name">库</span>
              </div>
              <div class="stateCtn"
                :class="{'orange':itemOrder.product_weave_progress.product>0,'green':itemOrder.product_weave_progress.product>=100}">
                <div class="state"></div>
                <span class="name">织</span>
              </div>
              <div class="stateCtn"
                :class="{'orange':itemOrder.product_push_progress>0,'green':itemOrder.product_push_progress>=100}">
                <div class="state"></div>
                <span class="name">收</span>
              </div>
              <div class="stateCtn"
                :class="{'orange':itemOrder.product_inspection_progress.r_product>0,'green':itemOrder.product_inspection_progress.r_product>=100}">
                <div class="state"></div>
                <span class="name">检</span>
              </div>
              <div class="stateCtn"
                :class="{'orange':itemOrder.pack_real_progress>0,'green':itemOrder.pack_real_progress>=100}">
                <div class="state"></div>
                <span class="name">箱</span>
              </div>
            </div>
            <div class="col">
              <div class="stateCtn rowFlex"
                :class="{'red':itemOrder.status === 2003 || itemOrder.status === 2005,'green':itemOrder.status === 2004,'blue':itemOrder.status === 2002,'orange':itemOrder.status === 2001}">
                <div class="state"></div>
                <span class="name">{{itemOrder.status|filterStatus}}</span>
              </div>
            </div>
            <div class="col">
              {{itemOrder.order_time}}
            </div>
            <div class="col">
              <span class="opr"
                @click="$router.push('/order/orderDetail/' + itemOrder.id)">详情</span>
              <span class="opr">
                <el-dropdown @command="handleCommand($event,itemOrder.id)">
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='change'>
                      <span class="updated">修改</span>
                    </el-dropdown-item>
                    <el-dropdown-item command='delete'>
                      <span class="delete">删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </div>
        </div>
        <div class="pageCtn">
          <el-pagination background
            :page-size="10"
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="pages"
            @current-change="getOrderList">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHash } from '@/assets/js/common.js'
import { order, group, client, chartsAPI } from '@/assets/js/api.js'
export default {
  data () {
    return {
      openHiddleFilter: false,
      processData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 24, // 左
          y: 20, // 上
          x2: 24, // 右
          y2: 10 // 下
        },
        xAxis: {
          data: [],
          show: false
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '订单数量',
          data: [],
          type: 'bar',
          barMinHeight: 2,
          itemStyle: {
            color: '#1a95ff'
          }
        }]
      },
      processAll: 0,
      delayData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 24, // 左
          y: 20, // 上
          x2: 24, // 右
          y2: 10 // 下
        },
        xAxis: {
          data: [],
          show: false
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '订单数量',
          data: [],
          type: 'bar',
          barMinHeight: 2,
          itemStyle: {
            color: '#FA9036'
          }
        }]
      },
      delayAll: 0,
      completeData: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} :{c} ({d})%'
        },
        legend: {
          orient: 'vertical',
          left: 24,
          top: 20,
          data: ['已完成', '未完成']
        },
        color: ['#1A95FF', '#E6A23C', '#01B48C'],
        series: [
          {
            name: '完成率',
            type: 'pie',
            radius: '55%',
            center: ['65%', '50%'],
            data: [
              { value: 0, name: '已完成' },
              { value: 0, name: '未完成' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            minAngle: [10]
          }
        ]
      },
      completeAll: 0,
      monthData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 24, // 左
          y: 20, // 上
          x2: 24, // 右
          y2: 10 // 下
        },
        xAxis: {
          data: [],
          show: false
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '发货数量',
          data: [],
          type: 'line',
          symbol: 'none',
          smooth: true,
          areaStyle: {
            color: '#1a95ff'
          },
          itemStyle: {
            color: '#1a95ff'
          },
          lineStyle: {
            width: 2
          },
          smoothMonotone: 'x'
        }]
      },
      monthAll: 0,
      searchOrderOrProduct: 'order',
      loading: true,
      list: [],
      keyword: '',
      date: '',
      pages: 1,
      total: 0,
      state: '',
      group_id: '',
      groupArr: [],
      company_id: '',
      companyArr: [],
      has_materialPlan: '', // 物料计划
      has_materialOrder: '', // 物料订购
      has_materialStock: '', // 物料出入库
      has_weave: '', // 织造分配
      has_productInOut: '', // 产品收发
      has_inspection: '', // 成品检验
      has_boxing: '', // 装箱出库
      stateArr: [
        {
          name: '已创建',
          id: '2001'
        }, {
          name: '进行中',
          id: '2002'
        }, {
          name: '已完成',
          id: '2004'
        }, {
          name: '已取消',
          id: '2003'
        }, {
          name: '已延期',
          id: '2005'
        }
      ]
    }
  },
  watch: {
    pages (newVal) {
      this.changeRouter(newVal)
    },
    $route (newVal) {
      // 点击返回的时候更新下筛选条件
      this.getFilters()
      this.getOrderList()
    }
  },
  methods: {
    getFilters () {
      let params = getHash(this.$route.params.params)
      this.pages = Number(params.page)
      this.keyword = params.keyword
      if (params.date !== 'null' && params.date !== '') {
        this.date = params.date.split(',')
      } else {
        this.date = ''
      }
      this.searchOrderOrProduct = params.searchOrderOrProduct || 'order'
      this.has_materialPlan = params.has_materialPlan
      this.has_materialOrder = params.has_materialOrder
      this.has_materialStock = params.has_materialStock
      this.has_weave = params.has_weave
      this.has_productInOut = params.has_productInOut
      this.has_inspection = params.has_inspection
      this.has_boxing = params.has_boxing
      this.group_id = params.group_id ? Number(params.group_id) : ''
      this.company_id = params.company_id
      this.state = params.state
    },
    changeRouter (page) {
      let pages = page || 1
      this.$router.push('/order/orderList/page=' + pages + '&&keyword=' + this.keyword + '&&date=' + this.date + '&&has_materialPlan=' + this.has_materialPlan + '&&has_materialOrder=' + this.has_materialOrder + '&&has_materialStock=' + this.has_materialStock + '&&has_weave=' + this.has_weave + '&&has_productInOut=' + this.has_productInOut + '&&has_inspection=' + this.has_inspection + '&&has_boxing=' + this.has_boxing + '&&group_id=' + this.group_id + '&&company_id=' + this.company_id + '&&state=' + this.state + '&&searchOrderOrProduct=' + this.searchOrderOrProduct)
    },
    reset () {
      this.$router.push('/order/orderList/page=1&&keyword=&&date=&&has_materialOrder=&&has_materialPlan=&&has_materialStock=&&has_weave=&&has_productInOut=&&has_inspection=&&has_boxing=&&group_id=&&company_id=&&state=&&searchOrderOrProduct=')
    },
    getOrderList () {
      this.loading = true
      order.list({
        limit: 10,
        page: this.pages,
        product_code: this.searchOrderOrProduct === 'product' ? this.keyword : '',
        keyword: this.searchOrderOrProduct === 'order' ? this.keyword : '',
        start_time: (this.date && this.date.length > 0) ? this.date[0] : '',
        end_time: (this.date && this.date.length > 0) ? this.date[1] : '',
        client_id: this.company_id,
        group_id: this.group_id,
        status: this.state,
        status_material_plan: this.has_materialPlan,
        status_material_order: this.has_materialOrder,
        status_material_push: this.has_materialStock,
        status_weave: this.has_weave,
        status_product_push: this.has_productInOut,
        status_product_inspection: this.has_inspection,
        status_stock_out: this.has_boxing
      }).then(res => {
        this.list = res.data.data.map(item => {
          item.image = this.$mergeData(item.product_info, { mainRule: ['product_code', 'product_id'], otherRule: [{ name: 'numbers', type: 'add' }, { name: 'image' }] }).map(item => {
            return item.image.length > 0 ? item.image.map(itemImg => {
              return {
                ...itemImg,
                product_id: item.product_id
              }
            }) : [{
              image_url: '',
              thumb: '',
              product_id: item.product_id
            }]
          }).reduce((total, item) => {
            return total.concat(item)
          })
          item.number = item.product_info.map(itemPro => itemPro.numbers).reduce((total, itemNum) => {
            return Number(total) + Number(itemNum)
          })
          return item
        })
        this.total = res.data.meta.total
        this.loading = false
      })
    },
    handleCommand (type, id) {
      if (type === 'change') {
        this.$router.push('/order/orderUpdate/' + id)
      } else if (type === 'delete') {
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          order.delete({
            id: id
          }).then(res => {
            if (res.data.status) {
              this.$message.success('删除成功')
              setTimeout(() => {
                window.location.reload()
              }, 300)
            } else {
              this.$message.error(res.data.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else if (type === 'materialStock') {
        this.$router.push('/materialStock/materialStockDetail/' + id + '/1')
      }
    },
    createMonthDay () {
      let daysOfMonth = []
      let fullYear = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let lastDayOfMonth = new Date(fullYear, month, 0).getDate()
      for (var i = 1; i <= lastDayOfMonth; i++) {
        daysOfMonth.push(fullYear + '-' + (month < 10 ? '0' + month : month) + '-' + (i < 10 ? '0' + i : i))
      }
      return daysOfMonth
    }
  },
  created () {
    this.getFilters()
    this.getOrderList()
    Promise.all([group.list(), client.list()]).then((res) => {
      this.groupArr = res[0].data.data
      this.companyArr = res[1].data.data.filter((item) => {
        return item.type.indexOf(1) !== -1
      })
    })
    let today = new Date()
    let todayMore14 = [this.$getTime(today)]
    let todayLess14 = [this.$getTime(today)]
    let monthArr = this.createMonthDay()
    for (let i = 1; i < 14; i++) {
      todayLess14.push(this.$getTime(today.getTime() - 24 * 60 * 60 * 1000 * i))
      todayMore14.push(this.$getTime(today.getTime() + 24 * 60 * 60 * 1000 * i))
    }
    todayLess14 = todayLess14.reverse()
    chartsAPI.order().then((res) => {
      console.log(res)
      let data = res.data.data
      this.processData.xAxis.data = todayMore14
      todayMore14.forEach((item) => {
        this.processData.series[0].data.push(data.proceed.day_number[item] || 0)
      })
      this.delayData.xAxis.data = todayLess14
      todayLess14.forEach((item) => {
        this.delayData.series[0].data.push(data.delay.day_number[item] || 0)
      })

      this.monthData.xAxis.data = monthArr
      monthArr.forEach((item) => {
        this.monthData.series[0].data.push(data.month.day_number[item] || 0)
      })
      this.completeData.series[0].data = [
        { value: data.progress.pack_real, name: '已完成' },
        { value: data.month.total_number - data.progress.pack_real, name: '未完成' }
      ]
      this.completeAll = data.progress.pack_real / data.month.total_number * 100
      this.processAll = data.proceed.total_number
      this.delayAll = data.delay.total_number
      this.monthAll = data.month.total_number
    })
  },
  filters: {
    filterStatus (status) {
      if (status === 2001) {
        return '已创建'
      } else if (status === 2002) {
        return '进行中'
      } else if (status === 2003) {
        return '已取消'
      } else if (status === 2004) {
        return '已完成'
      } else if (status === 2005) {
        return '已延期'
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/less/order/orderList.less";
</style>
