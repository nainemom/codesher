import config from '../../config.json'
import list from '../pages/list.vue'
import single from '../pages/single.vue'
import home from '../pages/home.vue'

const paginated = (route, component) => {
  return [
    {
      path: route,
      component
    },
    {
      path: `${route === '/' ? '' : route}/page/:page`,
      component
    }
  ]
}

let ret = []


ret.push({
  path: '/',
  component: home
})

ret = ret.concat(paginated('/posts', list))
ret.push({
  path: '/posts/:post',
  component: single
})

ret = ret.concat(paginated(`/:categoryName/:categoryValue`, list))

export default ret