const config = require('./config.json')
const fastify = require('fastify')()
const fastifyStatic = require('fastify-static')
const fastifyCookie = require('fastify-cookie')
const path = require('path')
const axios = require('axios')
const gitAxios = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});
let serverAddress = ''

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/'
})
fastify.register(fastifyCookie, (err) => {
    if (err) throw err
})

fastify.get('/oauth/1', (request, reply) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${
        process.env.CLIENT_ID
        }&scope=${'repo'}&redirect_uri=${serverAddress}/oauth/2`;
    reply.redirect(url)
})

fastify.get('/oauth/2', async (request, reply) => {
    try {
        const { data } = await gitAxios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: request.query.code
        })
        reply.setCookie('github_token', data, {
            path: '/'
        }).redirect(`${serverAddress}/#`)
    } catch (e) {
        reply.redirect(`${serverAddress}/#`)
    }

})

console.log(process.env.port, typeof process.env.port)
fastify.listen(process.env.port || 1903, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
    serverAddress = address
})