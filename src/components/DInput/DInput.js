/*
 * @Descripttion: DInput 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-27 15:50:15
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import DIcon from '@/components/DIcon/index.js';
import omit from 'omit.js';
import classnames from 'classnames';
import { SizeProps, AffixAddonProps } from './propConfig/index.js';
import { isBoolean } from '@/utils/util';
import './index.less';

class DInput extends Component {
  

  /**
   * @param {element} children is first
   * @param {string | element} addonBefore is second
   * @param {string | element} addonAfter is third
   * @description 渲染一定会返回的 AddonDInput 组件
   * @memberof AddonDInput
   * @returns { AddonDInput} 返回 AddonDInput 组件
   */
  renderAddonDInput = (children, addonBefore, addonAfter) => {
     // 当有 addonBefore 的时候，返回 span，没有的时候返回 null,jsx 不解析
     const addonBeforeElem = addonBefore && (
     <span className="d-input-addon-before">{addonBefore}</span>
    );

    // 当有 addonAfter 的时候，返回 span，没有的时候返回 null,jsx 不解析
    const addonAfterElem = addonAfter && (
      <span className="d-input-addon-after">{addonAfter}</span>
    );
    
    return (
      <span className="d-input-addon-wraper">
        {addonBeforeElem}
        {React.cloneElement(children)}
        {addonAfterElem}
      </span>
    );
  };

  /**
   * @param {element} children is first
   * @param {string | element} prefix is second
   * @param {string | element} suffix is third
   * @description 渲染一定会返回的 AffixDInput 组件
   * @memberof AffixDInput
   * @returns { AffixDInput} 返回 AffixDInput 组件
   */
  renderAffixDInput = (children, prefix, suffix) => {
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
        {React.cloneElement(children)}
        {suffixElem}
      </span>
    );
  };

  /**
   * @param {string} classNames is first
   * @param {array} props is second
   * @description 渲染一定会返回的 DInput 组件
   * @memberof DInput
   * @returns { DInput} 返回 DInput 组件
   */
  renderSpecificDInput = (classNames, props) => {
    return (
      <input className={classNames}
        {...omit(props, ['prefix', 'size', 'suffix', 'addonBefore', 'addonAfter' ])}
      />
    );
  };

  /**
   * @description 根据前缀和后缀返回组件
   * @memberof DInput
   * @returns { DInput} 返回 DInput 组件
   */
  renderDInput = () => {
    const {props} = this;
    const {className, size, disabled, prefix, suffix, addonBefore, addonAfter} = props;

    // 供返回使用
    let children = null;

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

    // 生成一个 children 可能会放在 renderAffixDInput 里面使用 React.clone()
    // 这样的好处是可以不用 return 两遍 input 组件的封装组件，直接cloneElement
    children = this.renderSpecificDInput(classNames, props);

    // 当有 prefix 或者 suffix 其中的一个时候，返回新的节点
    if (prefix || suffix) {
      // 执行 affixDinput 的输出函数
      children = this.renderAffixDInput(children, prefix, suffix);
    }

    // 当有 addonAfter 或者 addonBefore 其中一个的时候，返回新的节点
    if (addonBefore || addonAfter) {
      // 执行 addonDinput 的输出函数
      children = this.renderAddonDInput(children, addonBefore, addonAfter);
    }
    
    // 返回最终的 children 组件
    return children;
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
  prefix: PropTypes.oneOfType(AffixAddonProps),
  size: PropTypes.oneOf(SizeProps),
  suffix: PropTypes.oneOfType(AffixAddonProps),
  addonAfter: PropTypes.oneOfType(AffixAddonProps),
  addonBefore: PropTypes.oneOfType(AffixAddonProps),
};

export default DInput;
