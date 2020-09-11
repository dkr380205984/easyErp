<template>
  <div id="priceList"
    class="indexMain"
    v-loading="loading">
    <div class="module">
      <div class="listCtn">
        <div class="filterCtn2">
          <div class="leftCtn">
            <span class="label">筛选条件：</span>
            <div class="filter_line">
              <el-input class="filter_item"
                v-model="keyword"
                @change="changeRouter(1)"
                placeholder="输入编号按回车键查询">
              </el-input>
              <el-cascader v-model="client_id"
                class="filter_item"
                :show-all-levels='false'
                placeholder="筛选公司"
                :options="clientArr"
                :filter-method='searchClient'
                clearable
                :props="{ expandTrigger: 'hover' }"
                @change="changeRouter(1)"
                filterable></el-cascader>
              <el-select v-model="user_id"
                class="filter_item"
                @change="changeRouter(1)"
                filterable
                clearable
                placeholder="筛选创建人">
                <el-option v-for="(item,index) in userArr"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="status"
                class="filter_item"
                style="width:160px"
                @change="changeRouter(1)"
                filterable
                clearable
                placeholder="筛选状态">
                <el-option v-for="(item,index) in statusArr"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
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
              <div class="resetBtn"
                @click="$router.push('/price/priceList/page=1&&keyword=&&date=null&&status=&&client_id=&&user_id=')">重置</div>
            </div>
          </div>
        </div>
        <div class="addCtn">
          <div class="btn btnBlue"
            @click="$router.push('/price/priceCreate')">添加报价</div>
        </div>
        <div class="list">
          <div class="title">
            <div class="col">
              <span class="text">编号</span>
            </div>
            <div class="col">
              <span class="text">名称</span>
            </div>
            <div class="col flex15">
              <span class="text">外贸公司</span>
            </div>
            <div class="col middle">
              <span class="text">图片</span>
            </div>
            <div class="col flex08">
              <span class="text">产品报价</span>
            </div>
            <div class="col flex01"></div>
            <div class="col">
              <span class="text">创建人</span>
            </div>
            <div class="col flex08">
              <span class="text">创建时间
              </span>
            </div>
            <div class="col">
              <span class="text">审核状态</span>
            </div>
            <div class="col middle">
              <span class="text">操作</span>
            </div>
          </div>
          <div class="row"
            v-for="(item,index) in list"
            :key="index">
            <div class="col">{{item.code}}</div>
            <div class="col">{{item.name}}</div>
            <div class="col flex15">{{item.client_name}}</div>
            <div class="col middle">
              <zh-img-list :list="item.img"></zh-img-list>
            </div>
            <div class="col flex08"><span class="price">{{$toFixed(item.price / item.exchange_rate * 100)}}</span>{{item.account_unit}}</div>
            <div class="col flex01"></div>
            <div class="col">{{item.user_name}}</div>
            <div class="col flex08">{{item.create_time}}</div>
            <div class="col">
              <div :class="['stateCtn', 'rowFlex', item.status === 2 ? 'green' : item.status === 3 ? 'red' : 'blue']">
                <div class="state"></div>
                <span class="name">{{item.status|filterStatus}}</span>
              </div>
            </div>
            <div class="col middle">
              <span class="opr"
                @click="$router.push('/price/priceDetail/' + item.pid + '?priceId=' + item.id)">{{has_check==='1'?'审核':'详情'}}</span>
              <span class="opr">
                <el-dropdown @command="handleCommand($event,item.id)">
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
            @current-change="getList">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { companyType } from '@/assets/js/dictionary.js'
import { price, client, auth } from '@/assets/js/api'
import { getHash } from '@/assets/js/common.js'
export default {
  data () {
    return {
      has_check: window.sessionStorage.getItem('has_check'),
      loading: true,
      searchTypeFlag: false,
      searchUserName: false,
      keyword: '',
      date: '',
      client_id: '',
      clientArr: [],
      user_id: '',
      userArr: [],
      searchStatusFlag: false,
      status: '',
      statusArr: [
        {
          id: 1,
          name: '待审核'
        }, {
          id: 2,
          name: '已通过'
        }, {
          id: 3,
          name: '驳回'
        }
      ],
      total: 0,
      pages: 1,
      list: []
    }
  },
  methods: {
    searchClient (node, query) {
      let flag = true
      if (query) {
        if (new RegExp('[\u4E00-\u9FA5]+').test(query.substr(0, 1))) {
          flag = node.data.label.includes(query)
        } else {
          const queryArr = query.split('')
          for (const item of queryArr) {
            if (!node.data.name_pinyin.includes(item)) {
              flag = false
              break
            }
          }
        }
      }
      return flag
    },
    getList () {
      this.loading = true
      price.list({
        limit: 10,
        page: this.pages,
        start_time: (this.date && this.date.length > 0) ? this.date[0] : '',
        end_time: (this.date && this.date.length > 0) ? this.date[1] : '',
        status: this.status,
        client_id: this.client_id && this.client_id[1],
        code: this.keyword,
        product_code: '',
        user_name: this.user_id
      }).then(res => {
        if (res.data.status === false) {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        } else {
          this.list = res.data.data.map(item => {
            let img = item.file_url ? item.file_url.map(vals => {
              return {
                image_url: vals,
                thumb: vals,
                product_id: null
              }
            }).concat(...(item.product_info.map(vals => {
              vals.product_info.image.forEach(valImg => {
                valImg.product_id = vals.product_info.product_id
              })
              return vals.product_info.image.length === 0 ? {
                image_url: '',
                thumb: '',
                product_id: vals.product_info.product_id
              } : vals.product_info.image
            }))) : [].concat(...(item.product_info.map(vals => {
              vals.product_info.image.forEach(valImg => {
                valImg.product_id = vals.product_info.product_id
              })
              return vals.product_info.image.length === 0 ? {
                image_url: '',
                thumb: '',
                product_id: vals.product_info.product_id
              } : vals.product_info.image
            })))
            return {
              code: item.quotation_code,
              name: item.name,
              client_name: item.client_name,
              img: img,
              price: item.total_price,
              // setNum: item.number,
              account_unit: item.account_unit,
              exchange_rate: item.exchange_rate,
              user_name: item.user_name,
              create_time: item.created_at ? item.created_at.split(' ')[0] : '',
              status: item.status,
              id: item.id,
              pid: item.pid || item.id
            }
          })
          this.total = res.data.meta.total
        }
        this.loading = false
      })
    },
    handleCommand (type, id) {
      if (type === 'change') {
        this.$router.push('/price/priceUpdate/' + id)
      } else if (type === 'delete') {
        this.$confirm('此操作将永久删除该报价单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          price.delete({
            id: id
          }).then(res => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              setTimeout(() => {
                window.location.reload()
              }, 100)
            } else {
              this.$message({
                type: 'error',
                message: res.data.massage
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '未知命令'
        })
      }
    },
    // 更新筛选条件
    getFilters () {
      let params = getHash(this.$route.params.params)
      this.pages = Number(params.page)
      this.keyword = params.keyword
      if (params.date !== 'null' && params.date !== '') {
        this.date = params.date.split(',')
      } else {
        this.date = ''
      }
      this.status = params.status ? Number(params.status) : ''
      this.client_id = params.client_id ? params.client_id.split(',') : ''
      this.user_id = params.user_id ? params.user_id : ''
    },
    changeRouter (page) {
      let pages = page || 1
      this.$router.push('/price/priceList/page=' + pages + '&&keyword=' + this.keyword + '&&date=' + this.date + '&&status=' + this.status + '&&client_id=' + this.client_id + '&&user_id=' + this.user_id)
    }
  },
  created () {
    this.getFilters()
    this.getList()
    Promise.all([
      client.list(),
      auth.list()
    ]).then(res => {
      this.clientArr = this.$getClientOptions(res[0].data.data, companyType, { type: [1, 2] })
      this.userArr = res[1].data.data
    })
  },
  filters: {
    filterStatus (item) {
      if (item === 1) {
        return '待审核'
      } else if (item === 2) {
        return '已通过'
      } else if (item === 3) {
        return '驳回'
      }
    }
  },
  watch: {
    pages (newVal) {
      this.changeRouter(newVal)
    },
    $route (newVal) {
      // 点击返回的时候更新下筛选条件
      this.getFilters()
      this.getList()
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/less/price/priceList.less";
</style>
