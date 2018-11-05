const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


// 解决相对路径的问题，否则下面很多地方都需要写../xxx/xxxx
function resolvePath(dir) {
    return path.join(__dirname, '..', dir)
}

commonConfig = {
    // 入口
    entry: {
        app: [
            'babel-polyfill',
            resolvePath('src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    // 出口 输出的文件名叫bundle.js,在项目根目录dist文件夹中
    output: {
        // filename: '[name].[hash].js',
        path:  resolvePath('dist'),
        // 区别按需加载的名字，否则只是1,2,3,不好区分
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['babel-loader?cacheDirectory=true'],
                include:  resolvePath('src')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:  resolvePath('src/index.html'),
            favicon: resolvePath('favicon.ico'),
            title: 'DanR2W'
        })
    ],
    resolve: {
        alias: {
            '@':  resolvePath('src')
        }
    }
}

module.exports = commonConfig
