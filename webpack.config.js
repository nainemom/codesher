var config = require('./config.json')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackPwaManifest = require('webpack-pwa-manifest')
var path = require('path')
var OfflinePlugin = require('offline-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

function generateConfig() {
  function styleLoader() {
    const ret = []
    ret.push({
      loader: MiniCssExtractPlugin.loader,
      options: {
        // you can specify a publicPath here
        // by default it use publicPath in webpackOptions.output
        publicPath: '../'
      }
    })
    ret.push({
      loader: 'css-loader'
    })
    // ret.push({
    //   loader: 'postcss-loader'
    // })

    let sassLoaderData = ''
    Object.keys(config.scssVars).forEach(key => {
      sassLoaderData += `$${key}: ${config.scssVars[key]};`
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
      loader: 'babel-loader'
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
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 200000,
        maxSize: 244000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: 1,
            reuseExistingChunk: true
          }
        }
      }
    },
    devServer: {
      contentBase: path.join(__dirname, "./public"),
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
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|ico|svg)/,
          use: fileLoader()
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.config': JSON.stringify(config)
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin({
        title: config.title,
        filename: path.resolve(__dirname, './public/index.html'),
        template: path.resolve(__dirname, './src/index.html')
      }),
      new WebpackPwaManifest({
        name: config.title,
        short_name: config.title,
        description: config.description,
        background_color: config.scssVars.background
      }),
      new OfflinePlugin()
    ]
  }
}

module.exports = generateConfig()
