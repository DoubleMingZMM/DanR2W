/*
 * @Descripttion: DInput 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-30 17:22:58
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classnames from 'classnames';
import DIcon from '../DIcon/index';
import { SizeProps, AffixAddonProps, TypeProps } from './propConfig/index.js';
import { isBoolean, isUndefined } from '@/utils/util';
import './index.less';

// 判断是否是有 value 值，有的话就用 value,没有的话是 undefined 则使用 defaultValue
// const decideValueToUse = (props) => {
//   // 解决只有 onChange 没有 value 和 defaultValue 的情况
//   // 因为会报 A component is changing an uncontrolled input of type undefined to be controlled.
//   const defaultVal = props.defaultValue || '';
//   return isUndefined(props.value) ? defaultVal : props.value;
// };

class DInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || ''
    };
    this.inputRef = React.createRef();
  }

  static getDerivedStateFromProps (nextProps, preState) {
    // 简化了代码，第一次和更新的时候都会调用
    if (!isUndefined(nextProps.value) && (nextProps.value !== preState.value)) {
      return {
        value: nextProps.value
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 做性能优化，不是只要父组件更新我就跟新，我会根据判断依据看自己要不要更新
    return nextState.value !== this.state.value;
  }

  // componentWillReceiveProps(nextProps) {
  //   // 如果没有 value 有 onChange 的时候，以前的做法需要做两次 setState
  //   // 但是现在需要只做了一次
  //   if (nextProps.value !== this.props.value) {
  //     this.setState({
  //       value: nextProps.value
  //     });
  //   }
  // }

  /**
   * @param {node} e is first
   * @description 按键按下时触发，可以通过判断按键的 keycode 来判断
   * @memberof AddonDInput
   * @returns { null } 没有返回
   */
  handleKeyDown = (e) => {
    const { onPressEnter, onKeyDown } = this.props;
    // 使用 keyDown 而不是用 keyPress 的原因在于，后者不能对系统按键做出响应
    if (e.keyCode === 13 && onPressEnter) {
      // 因为在组件使用的时候需要这个事件对象
      onPressEnter(e);
    }
    // onKeyDown 是原生事件，所以可以保留在 input 中
    // 不过事件是不会存在于 html  中的
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  /**
   * @description 为了重新聚焦的问题
   * @memberof AddonDInput
   * @returns { null } 没有返回
   */
  handleFocus = () => {
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.inputRef.current.focus();
  };
  
  /**
   * @param {node} e is first
   * @param {string} value is second,主要是兼容 handleReset 和 handleChange
   * @param {function} callback is third,主要是解决在 handleReset 中传来回调，用来聚焦
   * @description 为了解耦调用 this.handleSetValue,因为 handleReset 也会调用，这样就不会写很多代码
   * @memberof AddonDInput
   * @returns { null } 没有返回
   */
  handleSetValue = (e, value, callback) => {
    // 这让我想起 promise 中的失败和成功的回调
    const cb = callback || (v => v);
    // DInput 也遵循 React 的规范，比如当只传了 value，没有 onChange 毁掉的时候
    // 也不能对值进行修改，因为它是受控组件，需要制定唯一修改数据源 state 的 onChange 方法
    // 在 antd 中也做了类似遵循 React 的受控组件的问题，
    // 而他判断的依据是 props 中是否有 value 这个值
    const { onChange } = this.props;
    if (!this.props.hasOwnProperty('value')) {
      // 这个 cb 不是传入组件的回调，现在只是特定用于 handleReset 的回调
      this.setState({ value }, cb);
    }
    if (onChange) {
      // 因为传过来的 value 在 state 中保存了一份，所以说我只是执行回调只能更改传过来的属性值
      // 但是下次进来就不走 constructor 这个构造函数了，所以手动把 state 更新过来
      // this.setState({ value }, onChange(e));
      onChange(e);
    }
  };

  /**
   * @param {node} e is first
   * @description 为了解耦调用 this.handleSetValue,因为 handleReset 也会调用，这样就不会写很多代码
   * @memberof AddonDInput
   * @returns { null } 没有返回
   */
  handleReset = (e) => {
    this.handleSetValue(e, '', () => {
      this.handleFocus();
    });
  };
  
  /**
   * @param {node} e is first
   * @description 为了解耦调用 this.handleSetValue,因为 handleReset 也会调用，这样就不会写很多代码
   * @memberof AddonDInput
   * @returns { null } 没有返回
   */
  handleChange = (e) => {
    // 调用 handleSetValue 方法，解耦
    this.handleSetValue(e, e.target.value);
  };
  
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
   * @param {string | element} allowClear is forth
   * @description 渲染一定会返回的 AffixDInput 组件
   * @memberof AffixDInput
   * @returns { AffixDInput} 返回 AffixDInput 组件
   */
  renderAffixDInput = (children, prefix, suffix, allowClear) => {
    // 当 allowClear 是 true 并且 value 有值的时候，才会显示这个关闭按钮
    const { value } = this.state;
    const allowClearElem = (allowClear && value) && (
      <DIcon
        className="cursor-pointer"
        type="close-circle-fill"
        onClick={this.handleReset}
      />
    );

    // 当有 prefix 的时候，返回 span，没有的时候返回 null,jsx 不解析
    const prefixElem = prefix && (
      <span className="d-input-prefix">{prefix}</span>
    );

    // 当有 suffix 或者 allowClear 的时候，返回 span，没有的时候返回 null,jsx 不解析
    const suffixElem = (suffix || allowClear) && (
      <span className="d-input-suffix">
        {allowClearElem}
        {suffix}
      </span>
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
    const { value } = this.state;
    const { style } = this.props;

    // 删除的 props 属性
    const removeProps = [
      'prefix',
      'size',
      'suffix',
      'addonBefore',
      'addonAfter',
      'value',
      'defaultValue',
      'onChange',
      'allowClear',
      'onPressEnter',
      'style',
      'className'
    ];

    return (
      <input
        className={classNames}
        ref={this.inputRef}
        style={style}
        value={value}
        onChange={this.handleChange}
        // 执行的时候才去调用，不要加括号，因为在 render 函数中，会栈溢出
        onKeyDown={this.handleKeyDown}
        {...omit(props, removeProps)}
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
    const {className, size, disabled, prefix, suffix, addonBefore, addonAfter, allowClear} = props;

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
      'd-input-disabled': isDisabled,
      }
    );

    // 生成一个 children 可能会放在 renderAffixDInput 里面使用 React.clone()
    // 这样的好处是可以不用 return 两遍 input 组件的封装组件，直接cloneElement
    children = this.renderSpecificDInput(classNames, props);

    // 当有 prefix 、 suffix 或者 allowClear 其中的一个时候，返回新的节点
    if (prefix || suffix || allowClear) {
      // 执行 affixDinput 的输出函数
      children = this.renderAffixDInput(children, prefix, suffix, allowClear);
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
  type: 'text',
  disabled: false,
  size: 'default',
  allowClear: false,
  style: {}
};

// 类型检查
DInput.propTypes = {
  type: PropTypes.oneOf(TypeProps),
  disabled: PropTypes.bool,
  prefix: PropTypes.oneOfType(AffixAddonProps),
  size: PropTypes.oneOf(SizeProps),
  suffix: PropTypes.oneOfType(AffixAddonProps),
  addonAfter: PropTypes.oneOfType(AffixAddonProps),
  addonBefore: PropTypes.oneOfType(AffixAddonProps),
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  allowClear: PropTypes.bool,
  onPressEnter: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
};

export default DInput;
