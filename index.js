const config = require('./config.json')
const fastify = require('fastify')()
const fastifyStatic = require('fastify-static')
const path = require('path')


fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/'
})

fastify.get('/oauth', function (request, reply) {
  reply.send({ hello: 'world' })
})


fastify.listen(config.port, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})