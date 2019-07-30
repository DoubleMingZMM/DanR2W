/*
 * @Descripttion: DSelect 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-30 13:10:04
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classnames from 'classnames';
import DIcon from '../DIcon/index';
import './index.less';

class DSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'value'
    };
  }

  // componentWillMount() {
  //   console.log(77777777777777777777);
  // }

  static getDerivedStateFromProps(nextProps, preState) {
    console.log('nextProps=====》', nextProps);
    console.log('preState=====》', preState);
    if (nextProps.value !== preState.value) {
      return {
        value: nextProps.value
      };
    }
    return null;
  }

  // componentWillReceiveProps(nextProps) {
  //   // console.log('nextProps=====》', nextProps);
  //   // if (nextProps.className === 'ssss') {
  //   //   this.setState({
  //   //     value: 'value1'
  //   //   });
  //   // }
  // }

  handleClick = () => {
    console.log(9999);
  };

  
  /**
   * @description 渲染单独的 DSelect 组件
   * @memberof DSelect
   * @returns { DSelect} 返回 DSelect 组件
   */
  renderDSelect = () => {
    const { props } = this;
    const { className } = this.props;
    const { value } = this.state;

    // 处理所有的 className，将他们合并起来得到一个样式列表
    const classNames = classnames('d-select', className, {

      }
    );

    // 删除的 props 属性
    const removeProps = [
      'className'
    ];

    return (
      <div
        className={classNames}
        onClick={this.handleClick}
        {...omit(props, removeProps)}
      >
        <div className="d-select-selected-wraper" >
          <div className="d-select-selected-value">{value}</div>
          <DIcon type="down" />
        </div>
        {this.props.children}
      </div>
    );
  };


  render() {
    return this.renderDSelect();
  }
}

// 默认值，不在解构赋值中做，解耦分离
DSelect.defaultProps = {
  className: ''
};

// 类型检查
DSelect.propTypes = {
  className: PropTypes.string
};

export default DSelect;
