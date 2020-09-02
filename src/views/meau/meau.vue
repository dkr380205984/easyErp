<template>
  <div id='meau'
    class='indexMain'>
    <div class="module">
      <div class="titleLine">生产流程管理</div>
      <div class="meauList">
        <div class="meau_item"
          v-for="(item,index) in meauList.production"
          :key="index"
          @click="$router.push(item.path)">
          <svg class="iconFont"
            aria-hidden="true">
            <use :xlink:href="'#' + item.icon"></use>
          </svg>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
      <div class="titleLine">其他管理</div>
      <div class="meauList">
        <div class="meau_item"
          v-for="(item,index) in meauList.other"
          :key="index"
          @click="$router.push(item.path)">
          <svg class="iconFont"
            aria-hidden="true">
            <use :xlink:href="'#' + item.icon"></use>
          </svg>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      meauList: {
        production: [
          {
            name: '物料计划生产',
            id: 6,
            path: '/materialPlan/materialPlanList/page=1&&keyword=&&date=&&has_materialPlan=&&group_id=&&company_id=&&searchOrderOrProduct=/1',
            icon: 'icon-wuliaojihua'
          },
          {
            name: '物料订购',
            id: 7,
            path: '/material/materialList/page=1&&keyword=&&date==&&group_id=&&company_id=&&searchOrderOrProduct=/1',
            icon: 'icon-wuliaodinggou'
          },
          {
            name: '物料出入库',
            id: 15,
            path: '/materialStock/materialStockList/page=1&&keyword=&&date==&&group_id=&&company_id=&&searchOrderOrProduct=/1',
            icon: 'icon-wuliaochuruku'
          },
          {
            name: '织造加工',
            id: 8,
            path: '/weavingProcessing/weavingList/page=1&&keyword=&&date==&&group_id=&&company_id=&&searchOrderOrProduct=/1',
            icon: 'icon-zhizaojiagong'
          },
          {
            name: '产品收发',
            id: 9,
            path: '/receiveDispatch/receiveDispatchList/page=1&&keyword=&&date=&&group_id=&&company_id=&&state=&&searchOrderOrProduct=',
            icon: 'icon-chanpinshoufa'
          },
          {
            name: '产品检验',
            id: 10,
            path: '/inspection/inspectionList/page=1&&keyword=&&date=&&group_id=&&company_id=&&searchOrderOrProduct=',
            icon: 'icon-chanpinjianyan'
          },
          {
            name: '装箱管理',
            id: 11,
            path: '/packPlan/packPlanList/page=1&&keyword=&&date=&&group_id=&&company_id=&&state=&&searchOrderOrProduct=',
            icon: 'icon-zhuangxiangchuku'
          }
        ],
        other: [
          {
            name: '预订购列表',
            id: 5,
            path: '/materialOrder/materialOrderList/page=1&&client_id=&&date=',
            icon: 'icon-wuliaodinggou'
          },
          {
            name: '报销单管理',
            id: 18,
            path: '/reimbursement/reimbursementList',
            icon: 'icon-baoxiaodanguanli'
          },
          {
            name: '员工管理',
            id: 17,
            path: '/staff/staffList/page=1&&keyword=&&date=&&department=&&type=&&state=',
            icon: 'icon-yuangongguanli'
          },
          {
            name: '客户管理',
            id: 13,
            path: '/client/clientList/page=1&&keyword=&&clientType=',
            icon: 'icon-kehuguanli'
          },
          {
            name: '仓库管理',
            id: 12,
            path: '/stock/stockList/page=1&&keyword=&&type=',
            icon: 'icon-kucunguanli'
          },
          {
            name: '系统设置',
            id: 14,
            path: '/setting/setting',
            icon: 'icon-xitongshezhi'
          }
        ]
      }
    }
  },
  created () {
    let modules = window.sessionStorage.getItem('module_id') ? JSON.parse(window.sessionStorage.getItem('module_id')) : []
    this.meauList.production = this.meauList.production.filter(itemF => modules.indexOf(itemF.id) !== -1)
    this.meauList.other = this.meauList.other.filter(itemF => modules.indexOf(itemF.id) !== -1)
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/less/meau/meau.less";
</style>
