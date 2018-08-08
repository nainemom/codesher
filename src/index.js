import Vue from 'vue'
import VueRouter from 'vue-router'
import main from './main.vue'
import routes from './routes/dynamic.js'
import './style.scss'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

document.addEventListener('DOMContentLoaded', function () {
  new Vue({
    router,
    render: h => h(main)
  }).$mount('#app')
})