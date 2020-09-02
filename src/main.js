import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mycomponent from './components'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import myPlugin from './assets/js/plugin.js'
import ECharts from 'vue-echarts'
import 'echarts-gl'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import '@/assets/font/iconfont.js'

Vue.component('v-chart', ECharts)
Vue.config.productionTip = false
Vue.use(mycomponent)
Vue.use(ElementUI)
Vue.use(myPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
