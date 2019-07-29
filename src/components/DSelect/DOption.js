/*
 * @Descripttion: DOption 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-29 20:32:13
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classnames from 'classnames';
import './index.less';

class DOption extends Component {
  constructor(props) {
    super(props);
  }

  
  /**
   * @description 渲染单独的 DOption 组件
   * @memberof DOption
   * @returns { DOption} 返回 DOption 组件
   */
  renderDOption = () => {
    return (
      <div value="volvo">Volvo</div>
    );
  };


  render() {
    return this.renderDOption();
  }
}

// 默认值，不在解构赋值中做，解耦分离
DOption.defaultProps = {

};

// 类型检查
DOption.propTypes = {

};

export default DOption;
