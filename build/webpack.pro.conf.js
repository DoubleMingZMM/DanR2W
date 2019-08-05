/*
 * @Descripttion: webpack 生产环境配置
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-08-01 13:25:23
 * @LastEditors: Daniel
 * @LastEditTime: 2019-08-05 17:29:44
 */
// 导入 webpack-merge 包中的 merge 函数，合并配置
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const baseConfig = require('./webpack.base.conf');
const { resolvePath } = require('./utils');

// 创建 happypack 共享进程池，其中包含 6 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });

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
        // use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
        // 这里使用 MiniCssExtractPlugin 和 happypack 可以这么去处理，但是 include 和 exclude 会报错
        use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=extract'],
        // include: resolvePath('src')
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
            to: 'static',
            ignore: ['dll/*'],
        }
    ]),
    // happypack 实现
    new HappyPack({
        /*
        * 必须配置项
        */
        // id 标识符，要和 rules 中指定的 id 对应起来
        id: 'extract',
        // 需要使用的 loader，用法和 rules 中 Loader 配置一样
        // 可以直接是字符串，也可以是对象形式
        loaders: ['css-loader', 'postcss-loader'],
        // 使用共享进程池中的进程处理任务
        threadPool: happyThreadPool
    }),
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    // webpack 4 生产环境会自动使用 UglifyJsPlugin 压缩代码
    // ParallelUglifyPlugin则会开启多个子进程，把对多个文件的压缩工作分配给多个子进程去完成，
    // 每个子进程其实还是通过UglifyJS去压缩代码，但是变成了并行执行。
    // new ParallelUglifyPlugin({
    //     // 传递给 UglifyJS 的参数
    //     uglifyJS: {
    //         output: {
    //             // 最紧凑的输出
    //             beautify: false,
    //             // 删除所有的注释
    //             comments: false,
    //         },
    //         compress: {
    //             // 在UglifyJs删除没有用到的代码时不输出警告
    //             // warnings: false,
    //             // 删除所有的 `console` 语句，可以兼容ie浏览器
    //             drop_console: false,
    //             // 内嵌定义了但是只用到一次的变量
    //             collapse_vars: false,
    //             // 提取出出现多次但是没有定义成变量去引用的静态值
    //             reduce_vars: false,
    //         }
    //     },
    //     // 开启几个进城去压缩代码
    //     workerCount: 6,
    //     exclude: /node_modules/
    // }),
  ],

  /**
   * @description devtool 的配置信息
   * devtool 配置项
   * 
   */
  devtool: 'cheap-module-source-map'
};

module.exports = merge(baseConfig, proConfig);
