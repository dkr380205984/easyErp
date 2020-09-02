import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 面包屑
    breadUrl: [],
    title: '首页',
    // 消息通知需要用的分组集合
    group: [],
    // 消息通知人员列表
    userList: []
  },
  mutations: {
    // 路由跳转
    getRoute (state, route) {
      state.breadUrl = route
    },
    // 标题赋值
    getTitle (state, title) {
      state.title = title
    },
    getGroup (state, data) {
      state.group = data
    },
    getUserList (state, data) {
      state.userList = data
    }
  },
  actions: {
  },
  modules: {
  }
})
