const webpack = require('webpack')
const path = require('path')
// 处理压缩版
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'none',  // none production development
  entry: {
    'MyLibrary': './src/index.js',
    'MyLibrary.min': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'MyLibrary', // 指定库的全局变量名
    libraryTarget: 'umd', // 支持库引入的方式  
    libraryExport: 'default'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      }),
    ]
  },
  plugins: [
    // 打包后的头部注释
    new webpack.BannerPlugin({
      banner: '打包后的头部注释，我的js插件头部注释',
      exclude: /\.min\.js$/
    }),
    // 把插件通过script标签在index.html中引入
    new HtmlWebpackPlugin({
      title: 'js插件',
      filename: 'index.html',
      template: './examples/index.html',
      inject: 'head',
      hash: true
    })
  ]
}
