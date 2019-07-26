/*
 * @Descripttion: DButton 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-26 16:45:09
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DIcon from '@/components/DIcon/index.js';
import omit from 'omit.js';
import classnames from 'classnames';
import { HtmlTypeProps, ShapeProps, TypeProps, SizeProps } from './config/index.js';
import './index.less';

class DButton extends Component {
  constructor(props) {
    super(props);
    // 之前不理解为什么要把 loading 放在 state 中
    // 但是现在大概知道了，放在 state 中是因为，涉及到
    // 我们对它的修改，比如 loading delay 的需求
    this.state = {
      loading: props.loading
    };
    this.handleClick = this.handleClick.bind(this);
  }


  /**
   * @description 处理 button 和 a 标签的点击事件
   * @memberof DButton
   * @returns { false } 没有返回值，使用 bind 的形式
   */
  handleClick() {
    const { loading } = this.state;
    const { onClick} = this.props;
    // 其实可以不需要判断，因为我们这里 loading 会往原生组件写入 disabled 所以会禁用 onClick
    if (onClick && !loading) {
      onClick();
    }
    return false;
  }

  /**
   * @description 渲染 button 的函数
   * @returns {DOM} DOM 节点，箭头函数，不需要 bind
   */
  renderButton = () => {
    const { loading } = this.state;
    const { props } = this;
    // children 为 React 里面的固有属性，指的是标签之间的内容
    const { icon, children, className, type, shape,
    htmlType, size, ghost, block } = props;

    // large => lg
    // small => sm
    let sizeSuffix = '';
    switch (size) {
      case 'large':
        sizeSuffix = 'lg';
        break;
      case 'small':
        sizeSuffix = 'sm';
        break;
      default:
        break;
    }
    
    // 使用 classnames 将 d-button 以及自定义的 className 和 type 组成的样式 传入 button 标签
    const classNames = classnames('d-button', className, {
      // 单纯只用 d-button-${type} 的形式，无法满足如多个条件同时处理的结果
      // antd 就有这个问题，type 和 shape可以混用，因此多加一层样式处理不同类型
      [`d-button-type-${type}`]: type,
      [`d-button-shape-${shape}`]: shape,
      [`d-button-size-${sizeSuffix}`]: sizeSuffix,
      'd-button-loading': loading,
      'd-button-ghost': ghost,
      'd-button-block': block
    });

    // 设置 iconType，如果设置 loading 状态，则默认使用 DIcon 中的 loading
    // 未设置 loading 的话则使用传过来的 type
    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? (<DIcon
      className="mgr-5"
      spin={loading}
      type={iconType}
    />) : null;

    // 扩展 props 属性，用变量 buttonProps 代替
    const buttonProps = {
      ...props
    };

    // 一开始进来，loading 为 true 的话，会禁用这个 button，可以直接加上 disabled 属性
    // if (loading) {
    //   // buttonProps.disabled = true;
    // } else {
    //   // 用来处理当 loading 为 false 时，如果 disabled 为 true，需要表现为 disabled
    //   // if (!buttonProps['disabled']) delete buttonProps['disabled'];
    // }

    // 如果有 href 标签，则渲染 a 标签
    if (buttonProps.hasOwnProperty('href')) {
      return (
        <a
          className={classNames}
          onClick={this.handleClick}
          // 保留 style、href、target 属性
          {...omit(buttonProps, ['icon','shape', 'size', 'type', 'ghost', 'htmlType', 'loading', 'block', 'className'])}
        >
          {/* 如果 icon 没传的话，设置成 null，jsx 不解析 */}
          {iconNode}
          {children}
        </a>
      );
    }

    return (
      <button
        className={classNames}
        // 处理 button 原生的类型 默认为 button，还有 submit 和 reset
        type={htmlType}
        onClick={this.handleClick}
        // 保留 disabled 属性
        {...omit(buttonProps, ['icon','shape', 'size', 'type', 'ghost', 'href', 'htmlType', 'loading', 'target', 'block', 'style', 'className'])}
      >
        {/* 如果 icon 没传的话，设置成 null，jsx 不解析 */}
        {iconNode}
        {children}
      </button>
    );
  }

  render() {
    return this.renderButton();
  }
}

// 默认值，不在解构赋值中做，解耦分离
DButton.defaultProps = {
  className: '',
  htmlType: 'button',
  size: 'default',
  type: 'default',
  ghost: false,
  block: false
};

// 类型检查
DButton.propTypes = {
  icon: PropTypes.string,
  shape: PropTypes.oneOf(ShapeProps),
  size: PropTypes.oneOf(SizeProps),
  type: PropTypes.oneOf(TypeProps),
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  href: PropTypes.string,
  htmlType: PropTypes.oneOf(HtmlTypeProps),
  loading: PropTypes.bool,
  target: PropTypes.string,
  block: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DButton;
