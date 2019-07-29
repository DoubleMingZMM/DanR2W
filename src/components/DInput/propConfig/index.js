/*
 * @Descripttion: 关于 DInput 相关接口的类型
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-26 10:35:25
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-29 10:05:30
 */
import PropTypes from 'prop-types';

// 原生 input 支持的类型
const TypeProps = [
  'button',
  'checkbox',
  'file',
  'hidden',
  'image',
  'password',
  'radio',
  'reset',
  'submit',
  'text'
];

// prefix 和 suffix 、addonBefore、addonAfter 的指定 props
const AffixAddonProps = [
  PropTypes.string,
  PropTypes.element
];
// size 的指定 props
const SizeProps = ['default', 'large', 'small'];

export {
  TypeProps,
  AffixAddonProps,
  SizeProps
};