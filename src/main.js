import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store/index'

//引入拖拽排序
import VueDND from 'awe-dnd'
Vue.use(VueDND)

import $conf from './common/config/config'
Vue.prototype.$conf = $conf

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
