/*
 * @Descripttion: 支持的 DIcon 的所有 type
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-24 12:15:42
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-24 14:53:00
 */
import {isString} from '@/utils/util.js';
import {Logger} from '@/utils';

// 所有 DIcon 规定的 type 
const COMPATIBLE_TYPES = [
  'close-circle'
];

const isHasType = (type) => {
  if (!isString(type)) {
    Logger.error(`${type} is not string!`);
    return false;
  }
  if (type === '') {
    Logger.error(`${type} is blank, must be valid!`);
    return false;
  }
  return COMPATIBLE_TYPES.indexOf(type) !== -1;
};

export {
  isHasType
};
