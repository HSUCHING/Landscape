import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { fetch, post} from './axios/http'
Vue.prototype.$fetch = fetch;
Vue.prototype.$post = post;
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
