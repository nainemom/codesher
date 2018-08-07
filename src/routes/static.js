const fs = require('fs')
const path = require('path')

const urlName = (filename) => {
  return filename.split('.')[0]
}

function allPosts() {
  var dir = path.resolve(__dirname, '../../posts')
  var posts = fs.readdirSync(dir)
  var ret = []
  for (var i = 0; i < posts.length; i++) {
    ret.push({
      path: '/posts/' + urlName(posts[i]),
      data: JSON.parse(fs.readFileSync(dir + '/' + posts[i]))
    })
  }
  return ret
}
const posts = allPosts()
const ret = []





ret.push({
  path: '/',
  data: []
})

const authors = []
const tags = []

posts.forEach(post => {
  ret.push({
    path: post.path,
    data: post.data
  })

  post.data.authors.forEach(author => {
    if (authors.indexOf(author) === -1) {
      authors.push(author)
    }
  })
  post.data.tags.forEach(tag => {
    if (tags.indexOf(tag) === -1) {
      tags.push(tag)
    }
  })

})


authors.forEach(author => {
  ret.push({
    path: '/authors/' + author,
    data: posts.filter(post => {
      console.log(post.data.authors.indexOf(author))
      return post.data.authors.indexOf(author) !== -1
    })
  })
})

// tags.forEach(tag => {
//   ret.push({
//     path: 'tags/' + tag,
//     data: posts.filter(post => post.data.tags.indexof(tag) !== -1)
//   })
// })

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