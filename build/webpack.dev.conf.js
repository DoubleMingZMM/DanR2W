/*
 * @Descripttion: webpack 开发环境配置
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-08-01 13:25:23
 * @LastEditors: Daniel
 * @LastEditTime: 2019-08-01 19:01:12
 */
// 导入 webpack-merge 包中的 merge 函数，合并配置
const merge = require('webpack-merge');
const webpack = require('webpack');
const HappyPack = require('happypack');

const baseConfig = require('./webpack.base.conf');

const { resolvePath } = require('./utils');

// 创建 happypack 共享进程池，其中包含 6 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });

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
          // use: ['style-loader', 'css-loader', 'postcss-loader'],
          // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
          use: ['happypack/loader?id=css'],
          include: resolvePath('src')
      }
    ]
  },

  /**
   * @description plugins 的配置信息
   * 开发环境插件配置，比如热更
   */
  plugins: [
    // webpack 自带 HotModuleReplacementPlugin 插件，可以和 hot 结合配置热更
    // 但是单独使用这个插件无效，效果类似于直接使用 DevServer 自带的刷新功能一致
    // 也可以去掉这个插件的配置
    new webpack.HotModuleReplacementPlugin(),
    // happypack 实现
    new HappyPack({
      /*
      * 必须配置项
      */
      // id 标识符，要和 rules 中指定的 id 对应起来
      id: 'css',
      // 需要使用的 loader，用法和 rules 中 Loader 配置一样
      // 可以直接是字符串，也可以是对象形式
      loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      // 使用共享进程池中的进程处理任务
      threadPool: happyThreadPool
    }),
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
