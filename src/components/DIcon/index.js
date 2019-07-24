/*
 * @Descripttion: DIcon 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-24 08:42:03
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-24 20:12:57
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classnames from 'classnames';
import './index.less';

class DIcon extends Component {
  render() {
    const { props } = this;
    const {className = '', type, spin, rotate = 0, style = {} } = props;

    // 当 spin 为 true 的时候，设置 rotate 为 0，没有旋转角度
    const rotateDeg = spin ? 0 : rotate;

    // 将 DIcon 旋转固定角度角度,不写在样式里面是因为无法向样式传值。
    // 这样写是因为当没有传递 rotate 的时候也不想显示 transform: rotate(0deg)；
    const rotateStyle = rotateDeg ? {
      transform: `rotate(${rotateDeg}deg)`
    } : {};
    
    // 合并 rotateStyle 和 参数传过来的 style
    const mergeStyle = {
      ...style,
      ...rotateStyle
    };
    

    // 使用 classnames 将 d-icon 以及自定义的 className 和 type 组成的样式 传入 i 标签
    const classNames = classnames('d-icon', className, {
      // 是否将 DIcon 无限旋转
      'd-icon-spin': spin,
      [`d-icon-${type}`]: true
    });

    return (
      <i
        className={classNames}
        // 把 style 放在这里处理，将下面的给去掉，因为会存在覆盖的问题
        style={mergeStyle}
        // 去掉 style 和 className 是因为这两个上面需要合并组件传过来的值，故去掉
        {...omit(props, ['type','spin', 'rotate', 'style', 'className'])}
      />
    );
  }
}

DIcon.contextTypes = {
  // 暴露出去的接口，其中 I 标签是没哟 spin、rotate 和 type 的，需要过滤掉
  type: PropTypes.string,
  spin: PropTypes.bool,
  rotate: PropTypes.number,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default DIcon;
