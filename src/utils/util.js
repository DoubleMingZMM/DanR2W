/*
 * @Descripttion: 工具方法文件
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-24 12:21:59
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-24 12:30:19
 */
// 是否是字符串
const isString = (value) => {
    return Object.prototype.toString.call(value) === '[object String]';
};

// 是否是数字
const isNumber = (value) => {
    return Object.prototype.toString.call(value) === '[object Number]';
};

// 是否是布尔值
const isBoolean = (value) => {
    return Object.prototype.toString.call(value) === '[object Boolean]';
};

// 是否undefined
const isUndefined = (value) => {
    return Object.prototype.toString.call(value) === '[object Undefined]';
};

// 是否是null
const isNull = (value) => {
    return Object.prototype.toString.call(value) === '[object Null]';
};

// 是否数组
const isArray = (value) => {
    return Object.prototype.toString.call(value) === '[object Array]';
};

// 是否是函数
const isFunction = (value) => {
    return Object.prototype.toString.call(value) === '[object Function]';
};

// 是否是对象
const isObject = (value) => {
    return Object.prototype.toString.call(value) === '[object Object]';
};

// 是否是正则表达式
const isRegExp = (value) => {
    return Object.prototype.toString.call(value) === '[object RegExp]';
};

// 是否是日期对象
const isDate = (value) => {
    return Object.prototype.toString.call(value) === '[object Date]';
};

export {
  isString,
  isNumber,
  isBoolean,
  isUndefined,
  isNull,
  isArray,
  isFunction,
  isObject,
  isRegExp,
  isDate
};