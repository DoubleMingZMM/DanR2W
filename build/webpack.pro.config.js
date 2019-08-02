const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// webpack 4 中已经内置了 UglifyJSPlugin 这个插件
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin') webpack4放弃
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');

const proConfig = {
    // production 在webpack4.0会默认压缩，不用配置
    // UglifyJSPlugin，这种形式也可以不用再cli中配置
    mode: 'production',
    // 出口 输出的文件名叫bundle.js,在项目根目录dist文件夹中
    output: {
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 当使用mini-css-extract-plugin抽取css时，use中要去掉style-loader
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            // 给CleanWebpackPlugin插件设置根节点，因为该插件会默认为项目根路径
            root: path.resolve(__dirname, '../')
        }),
        // webpack4默认压缩代码，显示压缩可在cli中配置--mode production
        /* ,
        new UglifyJSPlugin() */
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[chunkhash].css',
            chunkFilename: 'css/[name].[chunkhash].css'
        })
    ],
    devtool: 'inline-source-map' // 替换了 cheap-module-source-map
};

module.exports = merge(baseConfig, proConfig);