// .eslintrc.js
module.exports = {
    'root': true,
    // 解析ES6
    'parser': 'babel-eslint',
    // 'parserOptions': {
    //     // 启用ES8语法支持
    //     'ecmaVersion': 2017,    
    //     // module表示ECMAScript模块
    //     'sourceType': 'module',
    //     // 使用额外的语言特性
    //     'ecmaFeatures': {
    //         'experimentalObjectRestSpread': true,
    //         'jsx': true,
    //         'modules': true,
    //     }
    // },
    // 这些环境并不是互斥的，所以你可以同时定义多个
    // 'env': {
    //     'browser': true,
    //     'jquery': true,
    //     'node': true,
    //     'commonjs': true,
    //     'es6': true,
    // },
    extends: [
        'eslint-config-daniel/react',
    ],
    // required to lint *.vue files
    // 不需要了 已经配置了自己的 npm 包,npm index.js 里面有
    // plugins: [
    //     // eslint 支持 html 所对应的插件（eslint-plugin-html）
    //     'html',
    //     // eslint 支持 react 所对应的插件（eslint-react-plugin）
    //     'react'
    // ],
    // check if imports actually resolve
    // 'settings': {
    //     'import/resolver': {
    //         'webpack': {
    //             'config': 'build/webpack.base.config.js'
    //         }
    //     },
    //     // 不需要了 已经配置了自己的 npm 包,npm index.js 里面有
    //     // "html/report-bad-indent": "error",
    //     // "html/html-extensions": [".html", ".we"],
    //     // "html/indent": "0",   // code should start at the beginning of the line (no initial indentation).
    //     // "html/indent": "+2",  // indentation is the <script> indentation plus two spaces.
    //     // "html/indent": "tab", // indentation is one tab at the beginning of the line.
    // },
    // 当访问当前源文件内未定义的变量时，no-undef 规则将发出警告
    // 所以需要定义这些额外的全局变量
    // 'globals': {
    //     'OnlySVG': true,
    //     'monitor': true,
    //     'CanvasRender': true,
    //     'Vue': true,
    //     'VueRouter': true
    // }
};

