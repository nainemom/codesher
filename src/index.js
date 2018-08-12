import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import AppLoading from './components/loading.vue'
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import main from './main.vue'
import routes from './routes/index.js'
import * as storeObject from './store/index.js'
import './style.scss'

Vue.use(VueRouter)
Vue.use(VueCookie)
Vue.use(Vuex)
Vue.prototype.$loading = Vue.loading = new (Vue.extend(AppLoading))()

const router = new VueRouter({
  routes
})
const store = new Vuex.Store(storeObject)

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
}

document.addEventListener('DOMContentLoaded', function () {
  global.codesher = new Vue({
    router,
    store,
    render: h => h(main)
  }).$mount('#app')
})