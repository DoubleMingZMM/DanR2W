/*
 * @Descripttion: DIcon 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-24 08:42:03
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-24 16:20:55
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classnames from 'classnames';
import './index.less';

class DIcon extends Component {
  render() {
    const { props } = this;
    const {className = '', type, spin, rotate = 0} = props;

    // 当 spin 为 true 的时候，设置 rotate 为 0，没有旋转角度
    const rotateDeg = spin ? 0 : rotate;

    // 将 DIcon 旋转固定角度角度,不写在样式里面是因为无法向样式传值。
    const rotateStyle = {
      transform: `rotate(${rotateDeg}deg)`
    };

    // 使用 classnames 将 d-icon 以及自定义的 className 和 type 组成的样式 传入 i 标签
    const classNames = classnames('d-icon', className, {
      // 是否将 DIcon 无限旋转
      'd-icon-spin': spin,
      [`d-icon-${type}`]: true
    });

    return (
        <i
            style={rotateStyle}
            className={classNames}
            {...omit(props, ['type','spin', 'rotate'])}
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
