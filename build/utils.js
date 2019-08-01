/*
 * @Descripttion: build 的一些工具方法
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-08-01 15:49:25
 * @LastEditors: Daniel
 * @LastEditTime: 2019-08-01 16:02:34
 */
const path = require('path');

// 解决相对路径的问题，否则下面很多地方都需要写../xxx/xxxx
const resolvePath = (...restDir) => {
  return path.join(__dirname, '..', ...restDir);
};

module.exports = {
  resolvePath
};