/*
 * @Descripttion: DInput 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-26 20:14:08
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import DIcon from '@/components/DIcon/index.js';
import omit from 'omit.js';
import classnames from 'classnames';
import { SizeProps, AffixProps } from './propConfig/index.js';
import { isBoolean } from '@/utils/util';
import './index.less';

class DInput extends Component {
  
  

  /**
   * @description 根据前缀和后缀返回组件
   * @memberof DInput
   * @returns { DInput} 返回 DInput 组件
   */
  renderDInput = () => {
    const {props} = this;
    const {className, size, disabled, prefix, suffix} = props;

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
      // 'd-input-prefix': prefix,
      'd-input-disabled': isDisabled,
      }
    );

    // 当有 prefix 或者 suffix 其中的一个时候，返回新的节点
    if (prefix || suffix) {
      // 当有 prefix 的时候，返回 span，没有的时候返回 null,jsx 不解析
      const prefixElem = prefix && (
        <span className="d-input-prefix">{prefix}</span>
      );

      // 当有 suffix 的时候，返回 span，没有的时候返回 null,jsx 不解析
      const suffixElem = suffix && (
        <span className="d-input-suffix">{suffix}</span>
      );
      
      return (
        <span className="d-input-affix-wraper">
          {prefixElem}
          <input className={classNames}
            {...omit(props, ['prefix', 'size', 'suffix' ])}
          />
          {suffixElem}
        </span>
      );
    }
    
    return (
      <input className={classNames}
        {...omit(props, ['prefix', 'size', 'suffix' ])}
      />
    );
  };

  render() {
    return this.renderDInput();
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
  prefix: PropTypes.oneOfType(AffixProps),
  size: PropTypes.oneOf(SizeProps),
  suffix: PropTypes.oneOfType(AffixProps),
};

export default DInput;
