import axios from 'axios'
import Message from 'element-ui'
import router from '../../router'
let qs = require('qs')
// 设置请求头
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'
// 请求超时时间
axios.defaults.timeout = 30000

// 在请求拦截器中 设置token,更新token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token_type') + ' ' + window.sessionStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

// 回调拦截
axios.interceptors.response.use(
  // 请求成功回调
  res => {
    if (res.data.code === 200) {

    } else if (res.data.code === 1001) {
      Message.Message.error(res.data.message)
    } else if (res.data.code === 1002) {
      Message.Message.error(res.data.message)
    } else if (res.data.code === 1003) {
      Message.Message.error('登录信息过期，请重新登录')
      router.push({ path: '/login' })
    } else if (res.data.code === 1004) {
      Message.Message.error(res.data.message)
    } else if (res.data.code === 1005) {
      Message.Message.error(res.data.message)
    }
    return res
  },
  // 请求失败回调
  error => {
    router.push({ path: '/index/error/' + error.response.status })
    return Promise.reject(error)
  }
)

function get (url, params) {
  params = typeof (params) === 'object' ? params : {}
  let response = axios({
    method: 'get',
    url: url,
    params: params
  })
  return Promise.resolve(response)
}

function post (url, params, contentType, responseType) {
  params = typeof (params) === 'object' ? params : {}
  // 设置请求头
  let headers = {}
  if (contentType && contentType === 'application/json') {
    headers = { 'Content-Type': 'application/json' }
  } else {
    params = qs.stringify(params)
    headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
  // 设置响应头
  responseType = responseType || 'json'
  let response = axios({
    method: 'post',
    url: url,
    data: params,
    headers: headers,
    responseType: responseType
  })
  return Promise.resolve(response)
}
let http = {
  get: get,
  post: post
}
export default http
