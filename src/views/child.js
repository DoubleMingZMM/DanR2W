import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DButton from '@/components/DButton/index';
import DIcon from '@/components/DIcon/index';
import DInput from '@/components/DInput/index';
import { Input,Button } from 'antd';

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
      // loading: !this.state.loading
      loading: {delay: 5}
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div style={{ color: this.context.color }}>
          我是child
        <div style={{width: 400}}>
          <DInput
            addonAfter={(<DButton type="primary">addonAfter</DButton>)}
            addonBefore={(<div>addonBefore</div>)}
            disabled={true}
            prefix={(<div>prefix</div>)}
            size="large"
            suffix="asdfg"
          />
          <div style={{marginBottom: 20}} />
          <Input
            addonAfter={(<Button type="primary">addonAfter</Button>)}
            addonBefore={(<div>addonBefore</div>)}
            disabled={true}
            placeholder="Basic usage"
            prefix="qw"
            size="large"
            suffix="asdfg"
          />
        </div>
      </div>
    );
  }
}

Child.propTypes = {
  // 也可以写成静态方式
  color: PropTypes.string
};
