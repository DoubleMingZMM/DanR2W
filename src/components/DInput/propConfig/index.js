/*
 * @Descripttion: 关于 DInput 相关接口的类型
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-26 10:35:25
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-26 19:56:23
 */
import PropTypes from 'prop-types';

// prefix 和 suffix 的指定 props
const AffixProps = [
  PropTypes.string,
  PropTypes.element
];
// size 的指定 props
const SizeProps = ['default', 'large', 'small'];

export {
  AffixProps,
  SizeProps
};