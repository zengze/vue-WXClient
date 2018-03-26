// 自定义的方法，用于多页面
const path = require('path')
const glob = require('glob')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PAGE_PATH = './src/pages'

exports.entryJsList = function () {
  let entryJsList = {}

  let entryFiles = glob.sync(PAGE_PATH + '/*/index.js')
  entryFiles.forEach(path => {
    let chunkName = path.slice('./src/pages/'.length, -'/index.js'.length)
    entryJsList[chunkName] = path
  })

  console.log(entryJsList)
  return entryJsList
}

exports.entryHtmlList = function () {
  let entryHtmlList = []

  // forEach
  let entryFiles = glob.sync(PAGE_PATH + '/*/index.js')
  entryFiles.forEach(path => {
    let chunkName = path.slice('./src/pages/'.length, -'/index.js'.length)

    // conf
    let conf = {
      template: path.replace('index.js', 'index.html'),
      filename: chunkName + '.html',
      chunks: ['manifest', 'vendor', chunkName],
      inject: true
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }

    // push
    entryHtmlList.push(new HtmlWebpackPlugin(conf))
  })

  console.log(entryHtmlList)
  return entryHtmlList
}
