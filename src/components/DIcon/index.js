/*
 * @Descripttion: DIcon 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-24 08:42:03
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-24 09:46:59
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import './index.less';

class DIcon extends Component {
  render() {
    const { props: iconProps } = this;

    return (
        <i className="d-icon d-icon-close" {...omit(iconProps, ['type','spin'])} />
    );
  }
}

DIcon.contextTypes = {
  // 暴露出去的接口，其中 I 标签是没哟 spin 和 type 的，需要过滤掉
  type: PropTypes.string,
  spin: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default DIcon;
