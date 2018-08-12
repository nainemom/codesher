const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')

const serverAddress = () => {
  return (req, res, next) => {
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    req.$serverAddress = `${protocol}://${req.get('host')}`
    next()
  }
}

module.exports = [
  express.static(path.join(__dirname, '../public')),
  cookieParser(),
  serverAddress()
]