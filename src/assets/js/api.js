import http from './http.js'
const baseUrl = '/api'
//  登录
const login = (params) => http.post(`${baseUrl}/auth/login`, params, 'application/json')
//  注销
const logout = (params) => http.post(`${baseUrl}/auth/logout`, params, 'application/json')
// 修改账户密码
const changeUserPasd = (params) => http.post(`${baseUrl}/user/edit/pass`, params, 'application/json')
//  获取用户信息
const getAuthorization = (params) => http.post(`${baseUrl}/auth/user`, params, 'application/json')
// token
const getToken = (params) => http.get(`${baseUrl}/upload/token`, params)
// 消息通知
const notify = {
  create: (params) => http.post(`${baseUrl}/notify/save`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/notify/all`, params),
  read: (params) => http.post(`${baseUrl}/notify/check/status`, params, 'application/json'),
  unread: (params) => http.get(`${baseUrl}/notify/no/read`, params) // 未读消息数量
}
// 全局搜索
const globleSearch = {
  search: (params) => http.post(`${baseUrl}/index/search`, params, 'application/json')
}
// 发货数量统计
const indexCount = {
  dispatchCount: (params) => http.get(`${baseUrl}/index/dispatch/count`, params)
}
// 教程
const tutorial = {
  detail: (params) => http.get(`${baseUrl}/admin/system/study/one`, params),
  list: (params) => http.get(`${baseUrl}/admin/system/study/list`, params)
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
// 小组
const group = {
  create: (params) => http.post(`${baseUrl}/user/group/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/user/group/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/client/one`, params),
  list: (params) => http.get(`${baseUrl}/user/group/list`, params)
}
// 客户管理
const client = {
  create: (params) => http.post(`${baseUrl}/client/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/client/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/client/one`, params),
  list: (params) => http.get(`${baseUrl}/client/list`, params),
  disable: (params) => http.post(`${baseUrl}/client/status/check`, params, 'application/json')
}
const chartsAPI = {
  sampleOrder: (params) => http.get(`${baseUrl}/index/sample/order/dispatch`, params),
  order: (params) => http.get(`${baseUrl}/index/order/dispatch`, params)
}
// 产品管理
const product = {
  create: (params) => http.post(`${baseUrl}/product/save`, params, 'application/json'),
  update: (params) => http.post(`${baseUrl}/product/save`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/product/one`, params),
  delete: (params) => http.post(`${baseUrl}/product/delete`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/product/list`, params)
}
// 订单样单类型设置
let orderType = {
  typeList: (params) => http.get(`${baseUrl}/order/type/list`, params),
  saveType: (params) => http.post(`${baseUrl}/order/type/save`, params, 'application/json'),
  deleteType: (params) => http.post(`${baseUrl}/order/type/delete`, params, 'application/json')
}
// 订单预警
const warnSetting = {
  create: (params) => http.post(`${baseUrl}/order/progress/time/set`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/order/progress/time/detail`, params),
  list: (params) => http.get(`${baseUrl}/order/progress/time/list`, params),
  delete: (params) => http.post(`${baseUrl}/order/progress/time/delete`, params, 'application/json')
}
// 人员管理
const auth = {
  create: (params) => http.post(`${baseUrl}/user/save`, params, 'application/json'),
  update: (params) => http.post(`${baseUrl}/user/save`, params, 'application/json'),
  ban: (params) => http.post(`${baseUrl}/user/status/check`, params, 'application/json'),
  list: (params) => http.get(`${baseUrl}/user/list`, params)
}
export {
  auth,
  warnSetting,
  orderType,
  product,
  chartsAPI,
  client,
  group,
  order,
  tutorial,
  indexCount,
  globleSearch,
  notify,
  getAuthorization,
  changeUserPasd,
  getToken,
  logout,
  login
}