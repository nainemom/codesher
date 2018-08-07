var path = require('path')
var fs = require('fs')

// all posts and contents
const posts = (function () {
  var dir = path.resolve(__dirname, '../posts')
  var posts = fs.readdirSync(dir)
  var ret = []
  for (var i = 0; i < posts.length; i++) {
    ret.push({
      name: posts[i].split('.')[0],
      data: JSON.parse(fs.readFileSync(dir + '/' + posts[i]))
    })
  }
  return ret
})()

module.exports = posts