/*
 * @Descripttion: DButton 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-24 21:06:53
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DIcon from '@/components/DIcon/index.js';
import omit from 'omit.js';
import classnames from 'classnames';
import './index.less';

class DButton extends Component {

  render() {
    const { props } = this;
    // children 为 React 里面的固有属性，指的是标签之间的内容
    const { loading, icon, children } = props;
    
    // 设置 iconType，如果设置 loading 状态，则默认使用 DIcon 中的 loading
    // 未设置 loading 的话则使用传过来的 type
    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? (<DIcon
      className="mgr-5"
      spin={true}
      type={iconType}
    />) : null;

    // 扩展 props 属性，用变量 buttonProps 代替
    const buttonProps = {
      ...props
    };

    // 一开始进来，loading 为 true 的话，会禁用这个 button，可以直接加上 disabled 属性
    buttonProps.disabled = true;

    setTimeout(() => {
      delete buttonProps['disabled'];
      console.log(buttonProps);
    }, 3000);
    
    return (
      <button
        className="DButton"
        {...omit(buttonProps, ['icon','shape', 'size', 'ghost', 'href', 'htmlType', 'loading', 'target', 'block', 'style', 'className'])}
      >
        {/* 如果 icon 没传的话，设置成 null，jsx 不解析 */}
        {iconNode}
        {children}
      </button>
    );
  }
}

DButton.contextTypes = {
  icon: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  href: PropTypes.string,
  htmlType: PropTypes.string,
  loading: PropTypes.bool,
  target: PropTypes.string,
  block: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DButton;
