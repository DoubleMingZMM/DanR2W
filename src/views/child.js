import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DButton from '@/components/DButton/index';
import DIcon from '@/components/DIcon/index';
import { Button, Icon } from 'antd';

export default class Child extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(22222222222);
  }

  render() {
    return (
      <div style={{ color: this.context.color }}>
          我是child
        <DButton loading={true}>
          <span>sdfgsdfg</span>
        </DButton>
        <Button loading={true}>
          <span>sdfgsdfg</span>
        </Button>
        {/* <DIcon
          className="mgr-5"
          rotate={90}
          style={{marginRight: 5}}
          title="Icon"
          type="frown"
          onClick={this.handleClick}
        /> */}
      </div>
    );
  }
}

Child.contextTypes = {
  // 也可以写成静态方式
  color: PropTypes.string
};
