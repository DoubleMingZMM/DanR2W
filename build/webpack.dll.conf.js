/*
 * @Descripttion: webpack.dll.conf.js 文件，用来生成 manifeat.json 文件
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-15 19:48:04
 * @LastEditors: Daniel
 * @LastEditTime: 2019-08-03 13:07:13
 */

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { resolvePath } = require('./utils');

module.exports = {
    mode: 'production',
    
    // 你想要打包的模块的数组
    entry: {
        // 三个单独的依赖库，避免放在一起，太大，对应在 DllReferencePlugin 插件分开引用
        react: ['react'],
        antd: ['antd'],
        d3: ['d3'],
        redux: ['redux'],
        immutable: ['immutable']
    },
    output: {
        path: resolvePath('static', 'dll'), // 打包后文件输出的位置
        filename: '[name].dll.js',
        library: '[name]_library'
        // vendor.dll.js中暴露出的全局变量名。
        // 主要是给DllPlugin中的name使用，
        // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    },
    plugins: [
        new CleanWebpackPlugin(['static/dll'], {
            // 给CleanWebpackPlugin插件设置根节点，因为该插件会默认为项目根路径
            root: resolvePath()
        }),
        new webpack.DllPlugin({
            path: resolvePath('static', 'dll', '[name]-manifest.json'),
            name: '[name]_library'
        }),
        // 压缩打包的文件，与该文章主线无关
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   }
        // })
    ]
};
