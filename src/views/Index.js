import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dad from './dad';

export default class Index extends Component {
  getChildContext() {
    return { color: 'red' };
  }

  render() {
    return (
        <Dad />
    );
  }
}

Index.childContextTypes = {
  // 也可以写成静态方式
  color: PropTypes.string
};
