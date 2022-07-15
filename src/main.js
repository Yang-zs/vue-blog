import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Fragment from 'vue-fragment'

Vue.config.productionTip = false
import '@/directive/permission'
Vue.use(ElementUI)
Vue.use(Fragment.Plugin)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
