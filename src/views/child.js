import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Child extends Component {
  render() {
    return (
      <div style={{ color: this.context.color }}>我是child</div>
    );
  }
}

Child.contextTypes = {
  // 也可以写成静态方式
  color: PropTypes.string
};
