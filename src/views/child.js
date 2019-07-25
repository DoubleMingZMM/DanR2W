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
          href="asdgfasd"
          icon="frown"
          loading={false}
          target="_blank"
          type="round"
        >
          <span>sdfgsdfg</span>
        </DButton>
        <Button
          disabled={false}
          href="as"
          loading={false}
          style={{color: 'red'}}
          target="_blank"
          type="primary"
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
