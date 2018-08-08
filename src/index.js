import Vue from 'vue'
import VueRouter from 'vue-router'
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import main from './main.vue'
import routes from './routes/index.js'
import './style.scss'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

OfflinePluginRuntime.install()

document.addEventListener('DOMContentLoaded', function () {
  new Vue({
    router,
    render: h => h(main)
  }).$mount('#app')
})