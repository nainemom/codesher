var config = require('./config.json')
var webpack = require('webpack')
var PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var fs = require('fs')

function allPosts() {
  var dir = path.resolve(__dirname, './posts')
  var posts = fs.readdirSync(dir)
  var ret = {}
  for (var i = 0; i < posts.length; i++) {
    ret[posts[i]] = JSON.parse(fs.readFileSync(dir + '/' + posts[i]))
  }
  return ret
}

var posts = allPosts()

var routes = require('./src/routes.js')('config', posts)

process.env.NODE_ENV = process.env.NODE_ENV || 'development'


function generateConfig() {
  function styleLoader() {
    const ret = []
    ret.push({
      loader: 'style-loader'
    })
    ret.push({
      loader: 'css-loader'
    })
    ret.push({
      loader: 'postcss-loader'
    })

    let sassLoaderData = ''
    Object.keys(config).forEach(key => {
      if (typeof config[key] === 'string' && config[key].indexOf('/') === -1 && config[key].indexOf('\\') === -1) {
        sassLoaderData += `$${key}: ${config[key]};`
      }
    })
    ret.push({
      loader: 'sass-loader',
      options: {
        data: sassLoaderData
      }
    })

    return ret
  }

  function jsLoader() {
    return {
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }
  }
  function fileLoader() {
    return {
      loader: 'file-loader?name=./[name].[ext]'
    }
  }
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './public'),
      filename: config.packageName + '.js',
      library: config.packageName,
      libraryTarget: 'umd'
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: false,
      port: 8080,
      host: "0.0.0.0",
      disableHostCheck: true,
      watchOptions: {
        watch: true,
        aggregateTimeout: 500,
        poll: 1000
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: jsLoader(),
                scss: styleLoader(),
                autoprefixer: true
              }
            }
          }
        },
        {
          test: /\.js$/,
          use: jsLoader(),
          exclude: /node_modules/
        },
        {
          test: /\.(scss|css)$/,
          use: styleLoader()
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|ico|zhtml)/,
          use: fileLoader()
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.config': JSON.stringify(config),
        'process.env.posts': JSON.stringify(posts) //
      }),
      new HtmlWebpackPlugin({
        title: 'Code Sher',
        filename: path.resolve(__dirname, './public/index.html'),
        template: path.resolve(__dirname, './src/index.html')
      }),
      new PrerenderSpaPlugin({
        routes: routes.map(route => route.path),
        staticDir: path.resolve(__dirname, './public'),
        renderer: new Renderer({
          injectProperty: '__PRERENDER_INJECTED',
          inject: 'sss'
        })
      })
    ]
  }
}

module.exports = generateConfig()
