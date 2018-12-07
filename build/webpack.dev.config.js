const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.config.js')


// 解决相对路径的问题，否则下面很多地方都需要写../xxx/xxxx
function resolvePath(dir) {
    return path.join(__dirname, '..', dir)
}

const devConfig = {
    mode: 'development',
    // 入口
    entry: {
       app: [
           'babel-polyfill',
           'react-hot-loader/patch',
           resolvePath('src/index.js')
       ]
    },
    // 出口 输出的文件名叫bundle.js,在项目根目录dist文件夹中
    output: {
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase:  resolvePath('dist'),
        open: true,
        port: 9999,
        hot: true,
        proxy: {
            '/api/v1': {
                target: 'http://106.12.132.170',// 接口的域名
                // secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: { // 如果接口本身没有/api需要通过pathRewrite来重写了地址
                    '^/api/v1': ''
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map'
}

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b
        }
        return undefined
    }
})(baseConfig, devConfig)
