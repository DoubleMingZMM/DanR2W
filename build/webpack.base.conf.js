/*
 * @Descripttion: webpack 配置
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-08-01 09:58:20
 * @LastEditors: Daniel
 * @LastEditTime: 2019-08-01 15:43:23
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// 解决相对路径的问题，否则下面很多地方都需要写../xxx/xxxx
function resolvePath(...restDir) {
  return path.join(__dirname, '..', ...restDir);
}

module.exports = {
  /**
   * @description entry 的配置信息
   * 配置成对象形式，易于扩展，entry 后直接加字符串是 entry: { main: 'src/index' }的简写形式
   * 可以使用数组形式用来配置，将依赖通过数组形式传入
   * 多页应用实际上是通过对象形式进行处理，形如：entry: {page1: '', page2: ''}
   * 
   */
  entry: {
      app: [
          'babel-polyfill',
          resolvePath('src', 'index')
      ],
    // vendor: []
  },

  /**
   * @description output 的配置信息
   * output 配置项是用来配置文件输出名称和路径等内容，最低配置应该有 filename 和 path
   * 
   */
  output: {
      path: resolvePath('dist'),
      // 区别按需加载的名字，否则只是1,2,3,不好区分
      chunkFilename: 'js/[name].[chunkhash].js'
  },

  /**
   * @description module 的配置信息
   * module 配置项是用来配置 loader
   */
  module: {
      rules: [
          {
              // 没有使用到jsx，可以不去正则jsx，会浪费性能
              test: /\.js$/,
              use: ['babel-loader?cacheDirectory=true'],
              // 只编译src，减少文件搜索范围
              include:  resolvePath('src')
          },
          {
              // 页面使用了，才会使用 webpack 处理
              // 对图片的使用png会更多，所以把png放在前面
              test: /\.(png|jpg|gif)$/,
              use: [{
                  // 你会疑惑为什么只是使用url-loader，那是因为url-loader封装了file-loader
                  // 1.文件大小小于limit参数，url-loader将会把文件转为DataURL；
                  // 2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。
                  loader: 'url-loader',
                  options: {
                      // 小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
                      limit: 8192
                  }
              }]
          },
          {
              test: /\.(ttf|eot|woff|woff2|svg)$/,
              use: ['file-loader']
          },
          {
              test: /\.less$/,
              use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
          }
      ]
  },

  /**
   * @description plugins 的配置信息
   * plugins 配置项是用来配置 plugins
   */
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template:  resolvePath('public', 'index.html'),
          favicon: resolvePath('public', 'favicon.ico'),
          title: 'DanR2W'
      }),
  ],

  /**
   * @description resolve 的配置信息
   * resolve 配置项是用来配置 resolve
   */
  resolve: {
      alias: {
          '@':  resolvePath('src')
      },
      // 一般的第三方库的入口文件在main中，尽量不要去查找，使用main减少搜索性能
      mainFields: ['main'],
      // 加上node_modules前缀，表示在node_modules目录下查找第三方库，缩短文件路径，进行优化
      // modules: [resolvePath('node_modules')],
      // 列表长度要小，高频放在前面默认值就是js 、less、css和 json
      extensions:['.js', '.less', '.css', '.json']
  }
};