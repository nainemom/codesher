module.exports = function (mode, files) {
  const ret = [
    {
      name: 'Home',
      path: '/',
      component: mode === 'app' ? require('./a.vue').default : null
    }
  ]
  if (mode === 'app') {
    ret.push({
      name: 'page2',
      path: '/posts/:post',
      component: require('./post.vue').default
    })
  } else {
    Object.keys(files).forEach(file => {
      ret.push({
        name: 'page2',
        path: '/posts/' + file,
        component: null
      })
    })
  }
  console.log(files)
  return ret
}
