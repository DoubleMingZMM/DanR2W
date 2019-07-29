/*
 * @Descripttion: DSearch 的实现
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-23 18:59:24
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-29 19:04:51
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classnames from 'classnames';
import DInput from './DInput';
import DButton from '../DButton/index';
import DIcon from '../DIcon/index';
import './index.less';

class DSearch extends Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }


  /**
   * @param {node} e is first
   * @description DSearch 后面按钮的搜索事件
   * @memberof handleSearch
   * @returns { null} 返回无
   */
  handleSearch = (e) => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(e);
    }
  };

  /**
   * @description 用 addonAfter 来渲染 onSearch 的按钮
   * @memberof DSearch
   * @returns { DSearch} 返回 DSearch onsearch 的按钮组件
   */
  renderAddonAfter = () => {
    const { disabled, size, searchText, searchIconType, type, addonAfter } = this.props;

    // 处理所有的 className，将他们合并起来得到一个样式列表
    const classNames = classnames('border-left-radius');

    // searchIconType 有的话则使用 DIcon ，没有就不渲染
    const diconElem = searchIconType && (
      <DIcon
        className="mgl-5"
        type={searchIconType}
      />
    );

    return (
      <span style={{whiteSpace: 'nowrap'}}>
        <DButton
          className={classNames}
          disabled={disabled}
          size={size}
          type={type}
          onClick={this.handleSearch}
        >
          {searchText}
          {diconElem}
        </DButton>
        {addonAfter}
      </span>
    );
  };
  
  /**
   * @description 在Dinput 组件的基础上渲染一定会返回的 DSearch 组件
   * @memberof DSearch
   * @returns { DSearch} 返回 DSearch 组件
   */
  renderDSearch = () => {
    const { props } = this;
    const { className, size } = props;

    // 需要去掉的属性
    const removeProps = [
      'onSearch',
      'className',
      'searchText',
      'searchIconType',
      'size',
      'type',
      'addonAfter'
    ];

    // 处理所有的 className，将他们合并起来得到一个样式列表,
    // 这个牛逼，通过兄弟元素，来曲线救国，当兄弟元素有 d-input-search
    // 我们就让旁边的兄弟元素没有 border
    const classNames = classnames('d-input-search', className);
    
    return (
      <DInput
        addonAfter={this.renderAddonAfter()}
        className={classNames}
        size={size}
        // 使用 DInput 组件封装好的 enter 事件方法
        onPressEnter={this.handleSearch}
        {...omit(props, removeProps)}
      />
    );
  };

  render() {
    return this.renderDSearch();
  }
}

// 默认值，不在解构赋值中做，解耦分离
DSearch.defaultProps = {
  searchText: 'search',
  type: 'primary'
};

// 类型检查
DSearch.propTypes = {
  onSearch: PropTypes.func,
  searchText: PropTypes.string,
  searchIconType: PropTypes.string,
  type: PropTypes.string,
};

export default DSearch;
