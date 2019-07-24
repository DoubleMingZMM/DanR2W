/*
 * @Descripttion: deal with autoprefixer plugin to fix all types of browsers
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-24 10:44:10
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-24 11:41:14
 */
let autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
          'browsers': [
              'defaults',
              'not ie < 11',
              'last 2 versions',
              '> 1%',
              'iOS 7',
              'last 3 iOS versions'
          ]
      })
  ]
};

