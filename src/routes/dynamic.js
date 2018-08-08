import ListPage from '../pages/list.vue'
import SinglePage from '../pages/single.vue'
import HomePage from '../pages/home.vue'
import NewPage from '../pages/new.vue'

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
  component: HomePage
})

ret = ret.concat(paginated('/posts', ListPage))
ret.push({
  path: '/posts/:post',
  component: SinglePage
})
ret.push({
  path: '/new',
  component: NewPage
})

ret = ret.concat(paginated(`/:categoryName/:categoryValue`, ListPage))

export default ret