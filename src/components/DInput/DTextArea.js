/*
 * @Descripttion: DTextArea 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-29 15:32:04
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classnames from 'classnames';
// import DIcon from '../DIcon/index';
// import { SizeProps, AffixAddonProps, TypeProps } from './propConfig/index.js';
import { isUndefined } from '@/utils/util';
import './index.less';

// 判断是否是有 value 值，有的话就用 value,没有的话是 undefined 则使用 defaultValue
const decideValueToUse = (props) => {
  // 解决只有 onChange 没有 value 和 defaultValue 的情况
  // 因为会报 A component is changing an uncontrolled textarea of type undefined to be controlled.
  const defaultVal = props.defaultValue || '';
  return isUndefined(props.value) ? defaultVal : props.value;
};

class DTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: decideValueToUse(props)
    };
    this.textareaRef = React.createRef();
  }

  /**
   * @param {node} e is first
   * @description 按键按下时触发，可以通过判断按键的 keycode 来判断
   * @memberof AddonDTextArea
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
   * @param {node} e is first
   * @description 为了解耦调用 this.handleSetValue,因为 handleReset 也会调用，这样就不会写很多代码
   * @memberof AddonDTextArea
   * @returns { null } 没有返回
   */
  handleChange = (e) => {
    // 调用 handleSetValue 方法，解耦
    this.handleSetValue(e, e.target.value);
  };

  /**
   * @param {node} e is first
   * @param {string} value is second,主要是兼容 handleReset 和 handleChange
   * @param {function} callback is third,主要是解决在 handleReset 中传来回调，用来聚焦
   * @description 为了解耦调用 this.handleSetValue,因为 handleReset 也会调用，这样就不会写很多代码
   * @memberof AddonDTextArea
   * @returns { null } 没有返回
   */
  handleSetValue = (e, value, callback) => {
    // 这让我想起 promise 中的失败和成功的回调
    const cb = callback || (v => v);
    // DTextArea 也遵循 React 的规范，比如当只传了 value，没有 onChange 毁掉的时候
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
      this.setState({ value }, onChange(e));
    }
  };

  /**
   * @description 渲染一定会返回的 DTextArea 组件
   * @memberof DTextArea
   * @returns { DTextArea} 返回 DTextArea 组件
   */
  renderDTextArea = () => {
    const { value } = this.state;
    const {props} = this;
    const {className, disabled, style} = props;

    // 合并 自身的 style 和 参数传过来的 style
    const mergeStyle = {
      ...style,
      // ...calculateHeightStyle
    };

    // 处理所有的 className，将他们合并起来得到一个样式列表
    const classNames = classnames('d-input', className, {
      'd-input-disabled': disabled,
      }
    );

    // 删除的 props 属性
    const removeProps = [
      'value',
      'defaultValue',
      'onChange',
      'onPressEnter',
      'onKeyDown',
      'autosize',
      'style'
    ];

    return (
      <textarea
        className={classNames}
        ref={this.textareaRef}
        style={mergeStyle}
        value={value}
        onChange={this.handleChange}
        // 执行的时候才去调用，不要加括号，因为在 render 函数中，会栈溢出
        onKeyDown={this.handleKeyDown}
        {...omit(props, removeProps)}
      />
    );
  };


  render() {
    return this.renderDTextArea();
  }
}

// 默认值，不在解构赋值中做，解耦分离
DTextArea.defaultProps = {
  disabled: false,
  autosize: false,
  style: {}
};

// 类型检查
DTextArea.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  disabled: PropTypes.bool,
  autosize: PropTypes.bool,
  style: PropTypes.object,
};

export default DTextArea;
