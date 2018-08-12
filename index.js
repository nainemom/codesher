const express = require('express')
const app = express()
const PORT = process.env.PORT || 1903
const oauth = require('./api/oauth.js')
const middlewares = require('./api/middlewares.js')

app.use(...middlewares)
app.get('/ping', (req, res) => res.send('pong'))
app.get('/oauth/1', oauth.stepOne('/oauth/2'))
app.get('/oauth/2', oauth.stepTwo('/#'))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
