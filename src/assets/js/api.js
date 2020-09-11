import http from './http.js'
const baseUrl = '/api'
// 登录
const login = (params) => http.post(`${baseUrl}/auth/login`, params, 'application/json')
// 注销
const logout = (params) => http.post(`${baseUrl}/auth/logout`, params, 'application/json')
// token
const getToken = (params) => http.get(`${baseUrl}/upload/token`, params)
// 删除上传文件
const deleteFile = (params) => http.post(`${baseUrl}/file/delete`, params, 'application/json')
// 潘通色号
const pantongList = (params) => http.get(`${baseUrl}/pan/color/list`, params)

// 样品管理
const sample = {
  create: (params) => http.post(`${baseUrl}/sample/product/save`, params, 'application/json'),
  update: (params) => http.post(`${baseUrl}/sample/product/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/sample/product/detail`, params),
  editDetail: (params) => http.get(`${baseUrl}/sample/product/edit`, params), // 样品修改时获取的详情数据
  delete: (params) => http.post(`${baseUrl}/sample/product/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/sample/product/list`, params)
}
// 产品管理
const product = {
  create: (params) => http.post(`${baseUrl}/product/save`, params, 'application/json'),
  update: (params) => http.post(`${baseUrl}/product/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/product/one`, params),
  delete: (params) => http.post(`${baseUrl}/product/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/product/list`, params)
}
// 产品类型
const productType = {
  create: (params) => http.post(`${baseUrl}/product/category/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/category/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/product/category/list`, params)
}
// 产品尺码
const productSize = {
  create: (params) => http.post(`${baseUrl}/product/size/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/size/delete`, params, 'application/json')
}
// 产品规格
const measurement = {
  create: (params) => http.post(`${baseUrl}/product/measurement/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/measurement/delete`, params, 'application/json')
}
// 产品 成衣类型 设置
const productPart = {
  create: (params) => http.post(`${baseUrl}/dress/part/save`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/dress/part/list`, params),
  delete: (params) => http.post(`${baseUrl}/dress/part/delete`, params, 'application/json')
}
// 花型
const flower = {
  create: (params) => http.post(`${baseUrl}/product/flower/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/flower/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/product/flower/list`, params)
}
// 工艺单设置
const craftSetting = {
  list: (params) => http.get(`${baseUrl}/production/edit/list`, params),
  createSide: (params) => http.post(`${baseUrl}/production/side/save`, params, 'application/json'),
  deleteSide: (params) => http.post(`${baseUrl}/production/side/delete`, params, 'application/json'),
  createMachine: (params) => http.post(`${baseUrl}/production/type/save`, params, 'application/json'),
  deleteMachine: (params) => http.post(`${baseUrl}/production/type/delete`, params, 'application/json'),
  createMethods: (params) => http.post(`${baseUrl}/production/method/save`, params, 'application/json'),
  deleteMethods: (params) => http.post(`${baseUrl}/production/method/delete`, params, 'application/json')
}
// 原料纱线
const yarn = {
  create: (params) => http.post(`${baseUrl}/yarn/private/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/yarn/private/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/yarn/one`, params),
  list: (params) => http.get(`${baseUrl}/yarn/list`, params),
  priceLog: (params) => http.get(`${baseUrl}//yarn/one`, params)
}
// 原料纱线颜色管理
const yarnColor = {
  create: (params) => http.post(`${baseUrl}/yarn/color/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/yarn/color/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/yarn/color/list`, params)
}
// 产品成分
const ingredient = {
  create: (params) => http.post(`${baseUrl}/product/component/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/component/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/product/component/list`, params)
}
// 产品配色
const colour = {
  create: (params) => http.post(`${baseUrl}/product/color/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/color/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/product/color/list`, params)
}
// 辅料
const material = {
  create: (params) => http.post(`${baseUrl}/product/material/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/material/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/product/material/one`, params),
  list: (params) => http.get(`${baseUrl}/product/material/list`, params),
  priceLog: (params) => http.get(`${baseUrl}/product/material/one`, params)
}
// 工艺单设置管理 边形/机型/组织法
const craftConfig = {
  getAll: (params) => http.get(`${baseUrl}/production/edit/list`, params)
}
// 工艺单穿综法
const penetrationMethod = {
  create: (params) => http.post(`${baseUrl}/craft/pattern/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/craft/pattern/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/craft/pattern/list`, params)
}
// 工艺单
const craft = {
  create: (params) => http.post(`${baseUrl}/product/craft/save`, params, 'application/json'),
  update: (params) => http.post(`${baseUrl}/product/craft/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/craft/draft/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/product/craft/one`, params),
  getByProduct: (params) => http.get(`${baseUrl}/craft/product/one`, params),
  setDefault: (params) => http.post(`${baseUrl}/product/craft/default`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/product/craft/list`, params),
  createCloth: (params) => http.post(`${baseUrl}/dress/craft/save`, params, 'application/json'),
  detailCloth: (params) => http.get(`${baseUrl}/dress/craft/detail`, params),
  deleteCloth: (params) => http.post(`${baseUrl}/dress/craft/delete`, params, 'application/json'),
  uploadImg: (params) => http.post(`${baseUrl}/craft/image/save`, params, 'application/json')
}
// 客户管理
const client = {
  create: (params) => http.post(`${baseUrl}/client/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/client/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/client/one`, params),
  list: (params) => http.get(`${baseUrl}/client/list`, params),
  disable: (params) => http.post(`${baseUrl}/client/status/check`, params, 'application/json')
}
// 人员管理
const auth = {
  create: (params) => http.post(`${baseUrl}/user/save`, params, 'application/json'),
  update: (params) => http.post(`${baseUrl}/user/save`, params, 'application/json'),
  ban: (params) => http.post(`${baseUrl}/user/status/check`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/user/list`, params)
}
// 小组
const group = {
  create: (params) => http.post(`${baseUrl}/user/group/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/user/group/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/client/one`, params),
  list: (params) => http.get(`${baseUrl}/user/group/list`, params)
}
// 部门 和小组公用的表和接口，type=2 ,前端做一下区分
const station = {
  create: (params) => http.post(`${baseUrl}/user/group/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/user/group/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/client/one`, params),
  list: (params) => http.get(`${baseUrl}/user/group/list`, params)
}
// 工序
const course = {
  create: (params) => http.post(`${baseUrl}/production/flow/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/client/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/client/one`, params),
  list: (params) => http.get(`${baseUrl}/production/flow/list`, params)
}
// 报价单管理
const price = {
  create: (params) => http.post(`${baseUrl}/product/quotation/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/product/quotation/delete`, params, 'application/json'),
  check: (params) => http.post(`${baseUrl}/product/quotation/check`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/product/quotation/detail`, params),
  list: (params) => http.get(`${baseUrl}/product/quotation/list`, params)
}
// 物料价格管理
// const yarnPrice = {
//   create: (params) => http.post(`${baseUrl}/product/quotation/save`, params, 'application/json'),
//   delete: (params) => http.post(`${baseUrl}/product/quotation/delete`, params, 'application/json'),
//   check: (params) => http.post(`${baseUrl}/product/quotation/check`, params, 'application/json'),
//   detail: (params) => http.get(`${baseUrl}/product/quotation/detail`, params),
//   list: (params) => http.get(`${baseUrl}/yarn/price/list`, params)
// }
// 配料单管理
// const planList = {
//   create: (params) => http.post(`${baseUrl}/product/quotation/save`, params, 'application/json'),
//   delete: (params) => http.post(`${baseUrl}/product/quotation/delete`, params, 'application/json'),
//   check: (params) => http.post(`${baseUrl}/product/quotation/check`, params, 'application/json'),
//   detail_code: (params) => http.get(`${baseUrl}/material/match/card/product`, params),
//   list: (params) => http.get(`${baseUrl}/yarn/price/list`, params)
// }
// 配料单管理
const productPlan = {
  create: (params) => http.post(`${baseUrl}/material/match/card/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/material/match/card/one`, params),
  delete: (params) => http.post(`${baseUrl}/material/match/card/delete`, params, 'application/json'),
  getByProduct: (params) => http.get(`${baseUrl}/material/match/card/product`, params),
  setDefault: (params) => http.post(`${baseUrl}/material/match/card/default`, params, 'application/json') // 设置默认配料单
}
// 工厂信息管理
const company = {
  create: (params) => http.post(`${baseUrl}/company/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/company/detail`, params)
}
// 仓库
const stock = {
  create: (params) => http.post(`${baseUrl}/factory/store/save`, params, 'application/json'),
  update: (params) => http.post(`${baseUrl}/factory/store/edit`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/factory/store/list`, params),
  detail: (params) => http.get(`${baseUrl}/factory/store/one`, params),
  yarnStock: (params) => http.post(`${baseUrl}/material/push`, params, 'application/json'),
  materialStock: (params) => http.post(`${baseUrl}/material/push`, params, 'application/json'),
  packStock: (params) => http.post(`${baseUrl}/pack/material/stock/save`, params, 'application/json'),
  productStock: (params) => http.post(`${baseUrl}/product/stock/save`, params, 'application/json')
}
// 物料库存（原料辅料都在这）
const yarnStock = {
  list: (params) => http.get(`${baseUrl}/stock/material/list`, params),
  log: (params) => http.get(`${baseUrl}/stock/material/detail`, params),
  logCount: (params) => http.get(`${baseUrl}/stock/material/detail/count`, params)
}
// 包装库存
const packStock = {
  list: (params) => http.get(`${baseUrl}/pack/material/stock/list`, params),
  log: (params) => http.get(`${baseUrl}/pack/material/stock/log/list`, params)
}
// 包装
const packag = {
  create: (params) => http.post(`${baseUrl}/pack/material/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/pack/material/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/pack/material/list`, params),
  priceLog: (params) => http.get(`${baseUrl}/pack/material/one`, params)
}
// 产品库存
const productStock = {
  list: (params) => http.get(`${baseUrl}/product/stock/list`, params),
  log: (params) => http.get(`${baseUrl}/product/stock/detail`, params)
}
// 订单
const order = {
  create: (params) => http.post(`${baseUrl}/order/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/order/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/order/list`, params),
  detail: (params) => http.get(`${baseUrl}/order/detail`, params),
  detailInfo: (params) => http.get(`${baseUrl}/order/info/detail`, params),
  editDetail: (params) => http.get(`${baseUrl}/order/one`, params),
  changeStatus: (params) => http.post(`${baseUrl}/order/status/check`, params, 'application/json'),
  getOrderBatch: (params) => http.get(`${baseUrl}/order/batch/info`, params)
}
// 样品订单
const sampleOrder = {
  create: (params) => http.post(`${baseUrl}/sample/orders/save`, params, 'application/json'),
  // delete: (params) => http.post(`${baseUrl}/sample/orders/save`, params, 'application/json'),
  editDetail: (params) => http.get(`${baseUrl}/sample/orders/edit`, params),
  list: (params) => http.get(`${baseUrl}/sample/orders/all`, params),
  detail: (params) => http.get(`${baseUrl}/sample/orders/one`, params),
  changeStatus: (params) => http.post(`${baseUrl}/sample/status/check`, params, 'application/json'),
  clientPay: (params) => http.post(`${baseUrl}/order/client/pay`, params, 'application/json'),
  saveConfirmInfo: (params) => http.post(`${baseUrl}/sample/confirm/info/save`, params, 'application/json')
}
// 物料预定购
const materialOrder = {
  create: (params) => http.post(`${baseUrl}/material/reserve/save`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/material/reserve/list`, params),
  detail: (params) => http.get(`${baseUrl}/material/reserve/detail`, params),
  stockIn: (params) => http.post(`${baseUrl}/material/stock/reserve/push`, params, 'application/json'),
  log: (params) => http.get(`${baseUrl}/stock/material/detail`, params),
  logDelete: (params) => http.post(`${baseUrl}/material/reserve/delete`, params, 'application/json'),
  allLog: (params) => http.get(`${baseUrl}/stock/reserve/material/log`, params)
}
// 物料计划单
const materialPlan = {
  init: (params) => http.get(`${baseUrl}/order/material/plan/init`, params),
  create: (params) => http.post(`${baseUrl}/order/material/plan/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/order/material/plan/show`, params),
  editDetail: (params) => http.get(`${baseUrl}/order/material/plan/show`, params),
  delete: (params) => http.post(`${baseUrl}/order/material/plan/delete`, params, 'application/json')
}
// 物料管理
const materialManage = {
  create: (params) => http.post(`${baseUrl}/material/order/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/material/order/list`, params),
  delete: (params) => http.post(`${baseUrl}/material/order/delete`, params, 'application/json'), // 订购调取撤销
  init: (params) => http.get(`${baseUrl}/material/order/init`, params), // 物料调取仓库初始化
  changeReality: (params) => http.post(`${baseUrl}/material/order/update/reality/weight`, params, 'application/json') // 改变订购日志实际入库值
}
// 加工工序
const process = {
  create: (params) => http.post(`${baseUrl}/production/flow/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/production/flow/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/production/flow/list`, params)
}
// 物料加工
const materialProcess = {
  create: (params) => http.post(`${baseUrl}/material/process/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/material/process/list`, params),
  delete: (params) => http.post(`${baseUrl}/material/process/delete`, params, 'application/json')
}
// 补纱 补辅料
const replenish = {
  create: (params) => http.post(`${baseUrl}/production/yarn/replenish/save`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/production/yarn/replenish/list`, params),
  delete: (params) => http.post(`${baseUrl}/production/yarn/replenish/delete`, params, 'application/json')
}
// 织造分配
const weave = {
  create: (params) => http.post(`${baseUrl}/production/weave/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/production/weave/list`, params),
  delete: (params) => http.post(`${baseUrl}/production/weave/delete`, params, 'application/json'),
  setRealityNumber: (params) => http.post(`${baseUrl}/production/update/reality/number`, params, 'application/json')
}
// 半成品加工分配
const processing = {
  create: (params) => http.post(`${baseUrl}/production/semi_product/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/production/semi_product/list`, params),
  delete: (params) => http.post(`${baseUrl}/production/semi_product/delete`, params, 'application/json'),
  saveMat: (params) => http.post(`${baseUrl}/material/distribute/save`, params, 'application/json'),
  matDetail: (params) => http.get(`${baseUrl}/material/distribute/detail`, params),
  matDelete: (params) => http.post(`${baseUrl}/material/distribute/delete`, params, 'application/json'),
  setRealityNumber: (params) => http.post(`${baseUrl}/production/update/reality/number`, params, 'application/json')
}
// 产品收发出入库
const receiveDispatch = {
  weaveCreate: (params) => http.post(`${baseUrl}/weave/product/push`, params, 'application/json'),
  weaveDetail: (params) => http.get(`${baseUrl}/weave/product/push/list`, params),
  // weaveDelete: (params) => http.post(`${baseUrl}/weave/product/push/delete`, params, 'application/json'),
  semiCreate: (params) => http.post(`${baseUrl}/semi/product/push`, params, 'application/json'),
  semiDetail: (params) => http.get(`${baseUrl}/semi/product/push/list`, params),
  // semiDelete: (params) => http.post(`${baseUrl}/semi/product/pop/delete`, params, 'application/json'),
  allCreate: (params) => http.post(`${baseUrl}/order/product/production/save`, params, 'application/json'),
  allDetail: (params) => http.get(`${baseUrl}/order/product/production/list`, params),
  allDelete: (params) => http.post(`${baseUrl}/order/product/production/delete`, params, 'application/json'),
  allDetailById: (params) => http.post(`${baseUrl}/order/product/production/detail`, params, 'application/json')
}
// 物料出入库
const materialStock = {
  init: (params) => http.get(`${baseUrl}/order/material/push/init`, params),
  create: (params) => http.post(`${baseUrl}/order/material/push`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/order/material/push/detail`, params),
  delete: (params) => http.post(`${baseUrl}/order/material/push/delete`, params, 'application/json'),
  surplusCreate: (params) => http.post(`${baseUrl}/order/material/surplus/push`, params, 'application/json')
}
// 装箱计划
const packPlan = {
  create: (params) => http.post(`${baseUrl}/pack/info/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/pack/info/list`, params),
  packOrder: (params) => http.post(`${baseUrl}/pack/order/save`, params, 'application/json'), // 包装订购,
  setRealityNumber: (params) => http.post(`${baseUrl}/production/update/reality/number`, params, 'application/json'), // 实际订购入库
  packOrderLog: (params) => http.get(`${baseUrl}/pack/order/list`, params), // 包装订购日志,
  deletePackOrder: (params) => http.post(`${baseUrl}/pack/order/delete`, params, 'application/json'), // 包装订购删除
  packOut: (params) => http.post(`${baseUrl}/stock/out/save`, params, 'application/json'), // 装箱出库
  packOutLog: (params) => http.get(`${baseUrl}/stock/out/list`, params), // 装箱出库日志
  deletePackOut: (params) => http.post(`${baseUrl}/stock/out/delete`, params, 'application/json'), // 装箱出库删除
  packActual: (params) => http.post(`${baseUrl}/pack/real/save`, params, 'application/json'), // 实际装箱
  packActualLog: (params) => http.get(`${baseUrl}/pack/real/list`, params), // 实际装箱日志
  deletePackActual: (params) => http.post(`${baseUrl}/pack/real/delete`, params, 'application/json'), // 实际装箱删除
  outMarket: (params) => http.post(`${baseUrl}/sell/out/save`, params, 'application/json'), // 销售出库
  outMarketLog: (params) => http.get(`${baseUrl}/sell/out/list`, params), // 销售出库日志
  deleteOutMark: (params) => http.post(`${baseUrl}/sell/out/delete`, params, 'application/json'), // 销售出库删除
  isConfirmPackPlan: (params) => http.post(`${baseUrl}/pack/info/check`, params, 'application/json'), // 装箱计划单确认
  deletePackPlan: (params) => http.post(`${baseUrl}/pack/info/delete`, params, 'application/json') // 装箱计划删除
}
// 产品检验
const inspection = {
  semiFinishedCreate: (params) => http.post(`${baseUrl}/production/semi/inspection`, params, 'application/json'),
  semiFinishedDetail: (params) => http.get(`${baseUrl}/production/semi/inspection/list`, params),
  semiFinishedDelete: (params) => http.post(`${baseUrl}/production/semi/inspection/delete`, params, 'application/json'),
  finishedCreate: (params) => http.post(`${baseUrl}/production/inspection`, params, 'application/json'),
  finishedDetail: (params) => http.get(`${baseUrl}/production/inspection/list`, params),
  finishedDelete: (params) => http.post(`${baseUrl}/production/inspection/delete`, params, 'application/json')
}
// 消息通知
const notify = {
  create: (params) => http.post(`${baseUrl}/notify/save`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/notify/all`, params),
  read: (params) => http.post(`${baseUrl}/notify/check/status`, params, 'application/json'),
  unread: (params) => http.get(`${baseUrl}/notify/no/read`, params) // 未读消息数量
}
// 订单财务总览
const finance = {
  detail: (params) => http.get(`${baseUrl}/financial/order/count/total`, params)
}
// 统计模块（财务统计模块）
const statistics = {
  sampleList: (params) => http.get(`${baseUrl}/financial/sample/order/overall/count/list`, params),
  sampleStatistics: (params) => http.get(`${baseUrl}/financial/sample/order/overall/count/total`, params),
  orderList: (params) => http.get(`${baseUrl}/financial/order/overall/count/list`, params),
  orderStatistics: (params) => http.get(`${baseUrl}/financial/order/overall/count/total`, params),
  materialList: (params) => http.get(`${baseUrl}/financial/material/use/count/list`, params),
  materialDetail: (params) => http.get(`${baseUrl}/financial/material/use/count/detail`, params),
  productList: (params) => http.get(`${baseUrl}/financial/product/output/count/list`, params),
  clientList: (params) => http.get(`${baseUrl}/financial/cooperate/client/count/list`, params),
  clientStatistics: (params) => http.get(`${baseUrl}/financial/cooperate/client/count/total`, params),
  clientDetailList: (params) => http.get(`${baseUrl}/financial/cooperate/client/count/list`, params),
  clientDetailStatistics: (params) => http.get(`${baseUrl}/financial/cooperate/client/count/total`, params),
  yearDetail: (params) => http.get(`${baseUrl}/financial/year/detail`, params)
}
// 订单结算
const settle = {
  create: (params) => http.post(`${baseUrl}/financial/settle/save`, params, 'application/json'),
  check: (params) => http.post(`${baseUrl}/financial/settle/check`, params, 'application/json'),
  log: (params) => http.get(`${baseUrl}/financial/settle/list`, params),
  changeLog: (params) => http.get(`${baseUrl}/user/operate/logs`, params),
  deleteLog: (params) => http.post(`${baseUrl}/financial/settle/delete`, params)
}
// 订单扣款
const chargebacks = {
  create: (params) => http.post(`${baseUrl}/financial/deduct/save`, params, 'application/json'),
  check: (params) => http.post(`${baseUrl}/financial/deduct/check`, params, 'application/json'),
  log: (params) => http.get(`${baseUrl}/financial/deduct/list`, params),
  deleteLog: (params) => http.post(`${baseUrl}/financial/deduct/delete`, params)
}
// 打印设置
const print = {
  create: (params) => http.post(`${baseUrl}/print/edit/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/print/edit/one`, params),
  list: (params) => http.get(`${baseUrl}/print/edit/list`, params)
}
// 全局搜索
const globleSearch = {
  search: (params) => http.post(`${baseUrl}/index/search`, params, 'application/json')
}
// 发货数量统计
const indexCount = {
  dispatchCount: (params) => http.get(`${baseUrl}/index/dispatch/count`, params)
}
// 修改账户密码
const changeUserPasd = (params) => http.post(`${baseUrl}/user/edit/pass`, params, 'application/json')
// 报价单预加载
const priceLoading = {
  create: (params) => http.post(`${baseUrl}/product/quotation/demo/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/product/quotation/demo/detail`, params),
  list: (params) => http.get(`${baseUrl}/product/quotation/demo/list`, params),
  delete: (params) => http.post(`${baseUrl}/product/quotation/demo/delete`, params, 'application/json')
}
// 员工管理
const staff = {
  create: (params) => http.post(`${baseUrl}/company/staff/save`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/company/staff/list`, params),
  createPay: (params) => http.post(`${baseUrl}/staff/wage/settle/save`, params, 'application/json'),
  deletePay: (params) => http.post(`${baseUrl}/staff/wage/settle/delete`, params, 'application/json'),
  createOtherPay: (params) => http.post(`${baseUrl}/staff/wage/settle/deduct/save`, params, 'application/json'),
  deleteOtherPay: (params) => http.post(`${baseUrl}/staff/wage/settle/deduct/delete`, params, 'application/json'),
  payList: (params) => http.get(`${baseUrl}/staff/wage/settle/list`, params),
  payLog: (params) => http.get(`${baseUrl}/settle/list`, params),
  detail: (params) => http.get(`${baseUrl}/company/staff/detail`, params),
  delete: (params) => http.post(`${baseUrl}/company/staff/delete`, params, 'application/json'),
  ban: (params) => http.post(`${baseUrl}/company/staff/status/check`, params, 'application/json'),
  settingMonthStaffUser: (params) => http.post(`${baseUrl}/wage/settle/staff/demo/save`, params, 'application/json'),
  getMonthStaffUser: (params) => http.get(`${baseUrl}/wage/settle/staff/demo/detail`, params)
}
// 员工标签设置
const staffTag = {
  create: (params) => http.post(`${baseUrl}/staff/tag/save`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/staff/tag/list`, params),
  delete: (params) => http.post(`${baseUrl}/staff/tag/delete`, params, 'application/json')
}
// 教程
const tutorial = {
  detail: (params) => http.get(`${baseUrl}/admin/system/study/one`, params),
  list: (params) => http.get(`${baseUrl}/admin/system/study/list`, params)
}
const orderBatch = {
  list: (params) => http.get(`${baseUrl}/order/batch/list`, params)
}
const warnSetting = {
  create: (params) => http.post(`${baseUrl}/order/progress/time/set`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/order/progress/time/detail`, params),
  list: (params) => http.get(`${baseUrl}/order/progress/time/list`, params),
  delete: (params) => http.post(`${baseUrl}/order/progress/time/delete`, params, 'application/json')
}
let logStatistics = {
  detail: (params) => http.get(`${baseUrl}/financial/operate/note/count`, params)
}
let chartsAPI = {
  sampleOrder: (params) => http.get(`${baseUrl}/index/sample/order/dispatch`, params),
  order: (params) => http.get(`${baseUrl}/index/order/dispatch`, params)
}
let getAuthorization = {
  get: (params) => http.post(`${baseUrl}/auth/user`, params, 'application/json')
}
// 订单样单类型设置
let orderType = {
  typeList: (params) => http.get(`${baseUrl}/order/type/list`, params),
  saveType: (params) => http.post(`${baseUrl}/order/type/save`, params, 'application/json'),
  deleteType: (params) => http.post(`${baseUrl}/order/type/delete`, params, 'application/json')
}
// 指派工艺单配料单
const assignCraftOrPlan = (params) => http.post(`${baseUrl}/product/appoint/save`, params, 'application/json')
// 可视化接口
const echartsApi = {
  calendar: (params) => http.get(`${baseUrl}/vision/dispatch/calendar`, params),
  clientAnalyse: (params) => http.get(`${baseUrl}/vision/client/analyse`, params),
  orderProduction: (params) => http.get(`${baseUrl}/vision/order/output/client`, params)
}
// 报销管理
const reimbursement = {
  create: (params) => http.post(`${baseUrl}/reimburse/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/reimburse/detail`, params),
  list: (params) => http.get(`${baseUrl}/reimburse/list`, params),
  delete: (params) => http.post(`${baseUrl}/reimburse/delete`, params, 'application/json'),
  check: (params) => http.post(`${baseUrl}/reimburse/check`, params, 'application/json')
}
// 进仓单
const warehouse = {
  create: (params) => http.post(`${baseUrl}/stock/card/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/stock/card/detail`, params),
  list: (params) => http.get(`${baseUrl}/stock/card/list`, params),
  delete: (params) => http.post(`${baseUrl}/stock/card/delete`, params, 'application/json')
}
// 运输单
const transport = {
  create: (params) => http.post(`${baseUrl}/stock/out/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/stock/out/detail`, params),
  list: (params) => http.get(`${baseUrl}/stock/out/list`, params),
  delete: (params) => http.post(`${baseUrl}/stock/out/delete`, params, 'application/json')
}
// 成品加工
const productProcess = {
  create: (params) => http.post(`${baseUrl}/stock/out/save`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/stock/out/list`, params),
  delete: (params) => http.post(`${baseUrl}/stock/out/delete`, params, 'application/json')
}
// 订单文件更新
const orderFile = {
  create: (params) => http.post(`${baseUrl}/order/file/save`, params, 'application/json'),
  // detail: (params) => http.get(`${baseUrl}/stock/out/detail`, params),
  list: (params) => http.get(`${baseUrl}/order/file/list`, params),
  delete: (params) => http.post(`${baseUrl}/order/file/delete`, params, 'application/json')
}
export {
  productProcess,
  orderFile,
  transport,
  warehouse,
  reimbursement,
  echartsApi,
  assignCraftOrPlan,
  orderType,
  staffTag,
  getAuthorization,
  chartsAPI,
  productPart,
  logStatistics,
  warnSetting,
  orderBatch,
  station,
  tutorial,
  staff,
  priceLoading,
  settle,
  chargebacks,
  statistics,
  changeUserPasd,
  indexCount,
  globleSearch,
  print,
  finance,
  notify,
  packPlan,
  inspection,
  receiveDispatch,
  processing,
  materialStock,
  weave,
  productStock,
  packag,
  packStock,
  yarnStock,
  replenish,
  materialProcess,
  materialManage,
  materialPlan,
  auth,
  process,
  craftSetting,
  measurement,
  productSize,
  sampleOrder,
  stock,
  materialOrder,
  order,
  company,
  // planList,
  productPlan,
  craftConfig,
  craft,
  penetrationMethod,
  // yarnPrice,
  price,
  yarn,
  yarnColor,
  group,
  course,
  client,
  login,
  logout,
  getToken,
  deleteFile,
  pantongList,
  sample,
  product,
  productType,
  flower,
  ingredient,
  colour,
  material
}
