var path = require('path')
var fs = require('fs')
var md5 = require('blueimp-md5')
var IDate = require('idate')

// all posts and contents
const posts = (function () {
  var dir = path.resolve(__dirname, '../posts')
  var posts = fs.readdirSync(dir)
  var ret = []
  for (var i = 0; i < posts.length; i++) {
    const post = {
      name: posts[i].split('.')[0],
      data: JSON.parse(fs.readFileSync(dir + '/' + posts[i])),
      calculatedData: {}
    }
    post.calculatedData.authors = post.data.authors.map(email => {
      const hash = md5(email)
      const image = 'https://www.gravatar.com/avatar/' + hash + '.jpg'
      return {
        email,
        image,
        hash,
        name: email.split('@')[0]
      }
    })
    const pdate = new IDate(post.data.date)
    post.calculatedData.pdate = pdate.toString(true)
    ret.push(post)
  }
  return ret
})()

module.exports = posts