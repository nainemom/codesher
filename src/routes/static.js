const fs = require('fs')
const path = require('path')

function allPosts() {
  var dir = path.resolve(__dirname, '../../posts')
  var posts = fs.readdirSync(dir)
  var ret = {}
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].indexOf('_') === -1) {
      ret[posts[i]] = JSON.parse(fs.readFileSync(dir + '/' + posts[i]))
    }
  }
  return ret
}
const posts = allPosts()
const ret = []

const urlName = (filename) => {
  return filename.split('.')[0]
}



ret.push({
  path: '/',
  data: []
})

Object.keys(posts).forEach(file => {
  ret.push({
    path: '/posts/' + urlName(file),
    data: posts[file]
  })
})

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