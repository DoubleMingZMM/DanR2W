/*
 * @Descripttion: webpack 开发环境配置
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-08-01 13:25:23
 * @LastEditors: Daniel
 * @LastEditTime: 2019-08-01 16:04:52
 */
// 导入 webpack-merge 包中的 merge 函数，合并配置
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.conf');
const { resolvePath } = require('./utils');

const devConfig = {
  /**
   * @description mode 的配置信息
   * webpack 4.0 之后开启 mode 模式，开发环境会有以下不需要配置
   * 设置模式有两种，第一在配置文件中注明 mode: "development"，第二在 cli 中加上 --mode="development"
   * 开发环境中会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
   */
  mode: 'development',

  /**
   * @description entry 的配置信息
   */
  entry: {
    app: [
        'babel-polyfill',
        'react-hot-loader/patch',
        resolvePath('src', 'index')
    ]
  },
  
  /**
   * @description output 的配置信息
   * output 项配置
   */
  output: {
      filename: 'js/[name].[hash].js'
  },

  /**
   * @description devServer 的配置信息
   * devServer 项配置，主要是结合 webpack-dev-server 包做开发环境的配置
   */
  devServer: {
    historyApiFallback: true,
    contentBase:  resolvePath('dist'),
    open: true,
    port: 9999,
    hot: true, // 热更新
    proxy: {
        '/api/v1': {
            target: 'http://106.12.132.170:9999',// 接口的域名
            // secure: false, // 如果是https接口，需要配置这个参数
            changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            pathRewrite: { // 如果接口本身没有/api需要通过pathRewrite来重写了地址
                '^/api/v1': ''
            }
        }
    }
  },

  /**
   * @description module 的配置信息
   * 开发环境不要抽取 css 做按需加载
   */
  module: {
    rules: [
      {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },

  /**
   * @description plugins 的配置信息
   * 开发环境插件配置，比如热更
   */
  plugins: [
    // webpack 自带 HotModuleReplacementPlugin 插件，可以和 hot 结合配置热更
    new webpack.HotModuleReplacementPlugin()
  ],

  /**
   * @description devtool 的配置信息
   * devtool 配置项
   * 
   */
  devtool: 'inline-source-map'
};

module.exports = merge({
  customizeArray(a, b, key) {
    /* entry.app不合并，全替换 */
    if (key === 'entry.app') {
        return b;
    }
    return null;
  }
})(baseConfig, devConfig);
