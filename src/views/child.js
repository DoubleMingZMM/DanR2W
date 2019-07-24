import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DButton from '@/components/DButton/index';
import DIcon from '@/components/DIcon/index';
import { Button, Icon } from 'antd';

export default class Child extends Component {
  render() {
    return (
      <div style={{ color: this.context.color }}>
          我是child
        <DButton />
        <Button />
        <DIcon rotate={90}
          spin={true}
          title="Icon"
          type="frown"
        />
        <Icon rotate={90}
          spin={true}
          title="Icon"
          type="home"
        />
      </div>
    );
  }
}

Child.contextTypes = {
  // 也可以写成静态方式
  color: PropTypes.string
};
