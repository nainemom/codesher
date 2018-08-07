import list from '../list.vue'
import single from '../single.vue'

export default [
  {
    path: '/',
    component: list
  },
  {
    path: '/page/:page',
    component: list
  },
  {
    path: '/posts',
    component: list
  },
  {
    path: '/posts/page/:page',
    component: list
  },
  {
    path: '/posts/:post',
    component: single
  },
  {
    path: '/authors/:author',
    component: list
  },
  {
    path: '/authors/:author/page/:page',
    component: list
  },
  {
    path: '/tags/:tag',
    component: list
  },
  {
    path: '/tags/:tag/page/:page',
    component: list
  }
]