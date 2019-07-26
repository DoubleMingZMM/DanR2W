/*
 * @Descripttion: DInput 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-26 19:30:33
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import DIcon from '@/components/DIcon/index.js';
import omit from 'omit.js';
import classnames from 'classnames';
import { SizeProps } from './propConfig/index.js';
import { isBoolean } from '@/utils/util';
import './index.less';

class DInput extends Component {
  

  render() {
    const {props} = this;
    const {className, size, disabled} = props;

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

    // 判断是否是 disabled 状态，然后设置 d-input-disabled 样式
    // const isDisabled = props.hasOwnProperty('disabled') ;
    let isDisabled = disabled;
    if (!disabled) isBoolean(disabled) ? isDisabled = false : isDisabled = true;

    // 处理所有的 className，将他们合并起来得到一个样式列表
    const classNames = classnames('d-input', className, {
      [`d-input-size-${sizeSuffix}`]: sizeSuffix,
      'd-input-disabled': isDisabled,
      }
    );
    
    return (
      <input className={classNames}
        {...omit(props, ['size'])}
      />
    );
  }
}

// 默认值，不在解构赋值中做，解耦分离
DInput.defaultProps = {
  disabled: false,
  size: 'default'
};

// 类型检查
DInput.propTypes = {
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(SizeProps)
};

export default DInput;
