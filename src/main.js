import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import $conf from './common/config/config'
Vue.prototype.$conf = $conf

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
