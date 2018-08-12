const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')

const serverAddress = () => {
  return (req, res, next) => {
    const protocol = (req.connection || {}).encrypted ? 'https' : 'http'
    req.$serverAddress = `${protocol}://${req.get('host')}`
    next()
  }
}

module.exports = [
  express.static(path.join(__dirname, '../public')),
  cookieParser(),
  serverAddress()
]