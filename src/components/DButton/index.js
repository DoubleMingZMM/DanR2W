import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class DButton extends Component {
  render() {
    return (
        <button className="DButton">
            asdf
        </button>
    );
  }
}

DButton.contextTypes = {
  // 也可以写成静态方式
  icon: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default DButton;
