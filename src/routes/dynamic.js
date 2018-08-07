import config from '../../config.json'
import list from '../list.vue'
import single from '../single.vue'
import home from '../home.vue'

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

console.log(config.categories)
config.categories.forEach(category => {
  console.log(category)
  ret = ret.concat(paginated(`/${category}/:${category}`, list))
})

console.log('dynamic ones')
console.log(ret)

export default ret