// import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'

// import 'font-awesome/css/font-awesome.css'

// import './favicon.ico'
// import './CNAME.none'
import main from './main.vue'

// Framevuerk.use('hammer', Hammer)
Vue.use(VueRouter)
// Vue.use(VueHighlightJS)
// Vue.use(Framevuerk)

// Routes
const routes = require('./routes.js')('app')
const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'history' : '',
  routes
})

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
