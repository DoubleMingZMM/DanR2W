import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class DIcon extends Component {
  render() {
    return (
        <i className="css-icon-close-circle"></i>
    );
  }
}

DIcon.contextTypes = {
  // 也可以写成静态方式
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default DIcon;
