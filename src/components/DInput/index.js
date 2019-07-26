/*
 * @Descripttion: DInput 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-26 17:34:57
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import DIcon from '@/components/DIcon/index.js';
import omit from 'omit.js';
import classnames from 'classnames';
import { } from './propConfig/index.js';
import './index.less';

class DInput extends Component {
  

  render() {
    const {props} = this;
    const {className} = props;

    const classNames = classnames('d-input', className
    );
    return (
      <input className={classNames} />
    );
  }
}

// 默认值，不在解构赋值中做，解耦分离
DInput.defaultProps = {

};

// 类型检查
DInput.propTypes = {

};

export default DInput;
