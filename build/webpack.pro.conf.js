/*
 * @Descripttion: webpack 生产环境配置
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-08-01 13:25:23
 * @LastEditors: Daniel
 * @LastEditTime: 2019-08-01 16:04:38
 */
// 导入 webpack-merge 包中的 merge 函数，合并配置
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.base.conf');
const { resolvePath } = require('./utils');

const proConfig = {
  /**
   * @description mode 的配置信息
   * webpack 4.0 之后开启 mode 模式，生产环境会有以下不需要配置
   * 设置模式有两种，第一在配置文件中注明 mode: "production"，第二在 cli 中加上 --mode="production"
   * 开发环境中会会将 process.env.NODE_ENV 的值设为 production。
   * 启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, 
   * OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
   */
  mode: 'production',

  /**
   * @description output 的配置信息
   * output 配置项是用来配置文件输出名称和路径等内容，最低配置应该有 filename 和 path
   * 
   */
  output: {
      filename: 'js/[name].[chunkhash].js',
  },

  /**
   * @description module 的配置信息
   * module 配置项是用来配置用来转换文件的 loader
   * 
   */
  module: {
    rules: [
      {
        test: /\.css$/,
        // 当使用mini-css-extract-plugin抽取css时，use中要去掉style-loader
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  },

  /**
   * @description plugins 的配置信息
   * plugins 配置项是用来配置webpack 运行过程中的 plugins
   * 
   */
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      // 给CleanWebpackPlugin插件设置根节点，因为该插件会默认为项目根路径
      root: resolvePath()
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[name].[chunkhash].css'
    }),
    // 拷贝static静态文件
    new CopyWebpackPlugin([
      {
          from: resolvePath('static'),
          to: 'static'
      },
    ]),
  ],

  /**
   * @description devtool 的配置信息
   * devtool 配置项
   * 
   */
  devtool: 'cheap-module-source-map'
};

module.exports = merge(baseConfig, proConfig);
