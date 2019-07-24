import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DButton from '@/components/DButton/index';
import DIcon from '@/components/DIcon/index';
import { Button, Icon } from 'antd';

export default class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  handleClick() {
    console.log(22222222222);
  }

  handleLoading() {
    this.setState({
      loading: !this.state.loading
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div style={{ color: this.context.color }}>
          我是child
        <DButton
          disabled={false}
          icon="frown"
          loading={false}
          type="primary"
        >
          <span>sdfgsdfg</span>
        </DButton>
        <Button
          disabled={false}
          icon="frown"
          loading={false}
          shape="circle"
          onClick={this.handleLoading}
        >
          <span>sdfgsdfg</span>
        </Button>
        <DIcon
          className="mgr-5"
          rotate={90}
          style={{marginRight: 5}}
          title="Icon"
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

Child.contextTypes = {
  // 也可以写成静态方式
  color: PropTypes.string
};
