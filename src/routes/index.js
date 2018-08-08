import ListPage from '../pages/list.vue'
import SinglePage from '../pages/single.vue'
import NewPage from '../pages/new.vue'

let ret = []

ret.push({
  path: '/',
  redirect: '/posts'
})

ret.push({
  path: '/posts',
  component: ListPage
})

ret.push({
  path: '/posts/:post',
  component: SinglePage
})
ret.push({
  path: '/new',
  component: NewPage
})


export default ret