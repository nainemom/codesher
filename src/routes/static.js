const config = require('../../config.json')
const posts = require('../../utils/allPosts.js')
let ret = []

const paginated = (route, categoryName = null, categoryValue = null) => {
  const ret = []
  ret.push(`${route}${categoryValue ? `/${categoryValue}` : ''}`)
  let dataLength
  if (categoryName && categoryValue) {
    dataLength = posts.filter(post => {
      return post.data[categoryName].indexOf(categoryValue) > -1
    }).length
  } else {
    dataLength = posts.length
  }

  const pages = Math.ceil(dataLength / config.perPage)
  for (let i = 2; i <= pages; i++) {
    ret.push(`${route === '/' ? '' : route}${categoryValue ? `/${categoryValue}` : ''}/page/${i}`)
  }
  return ret
}

ret.push('/')
ret = ret.concat(paginated('/posts'))
posts.forEach(post => {
  ret.push('/posts/' + post.name)
})


config.categories.forEach(categoryName => {
  const uniqueCategoryValues = [].concat(...posts.map(post => post.data[categoryName])).filter((cat, index, self) => self.indexOf(cat) === index)
  uniqueCategoryValues.forEach(categoryValue => {
    ret = ret.concat(paginated('/' + categoryName, categoryName, categoryValue))
  })
})

console.log('static ones')
console.log(ret)

module.exports = ret

//
// /                                sher page 1 (and home page)
// /page/:page                      sher other pages
// /author/:author                  author sher page
// /author/:author/page/:page       author sher other pages
// /tag/:tag                        tag sher other pages
// /tag/:tag/page/:page             tag sher other pages
// /posts/:post_id                  single
//