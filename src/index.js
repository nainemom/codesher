// import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'

// import 'font-awesome/css/font-awesome.css'

// import './favicon.ico'
// import './CNAME.none'
import main from './main.vue'
import routes from './routes/dynamic.js'
// Framevuerk.use('hammer', Hammer)
Vue.use(VueRouter)
// Vue.use(VueHighlightJS)
// Vue.use(Framevuerk)
// Routes
console.log(routes)

const router = new VueRouter({
  mode: 'history',
  routes
})

document.addEventListener('DOMContentLoaded', function () {
  new Vue({
    data() {
      return {

      }
    },
    router,
    methods: {

    },
    created() {

    },
    watch: {

    },
    render: h => h(main)
  }).$mount('#app')
})